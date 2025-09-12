import {
  Component,
  Input,
  OnChanges,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { Sprint } from '../../../../types/sprint';
import { Card } from '../../../../types/card';
import { List } from '../../../../types/list';
import 'chartjs-adapter-date-fns';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';

interface ChartData {
  date: Date;
  points: number;
}

@Component({
  selector: 'app-burndown-chart',
  standalone: true,
  imports: [CommonModule, ChartModule, ButtonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './burndown-chart.component.html',
  styleUrls: ['./burndown-chart.component.css'],
})
export class BurndownChartComponent implements OnChanges, AfterViewInit {
  @Input() sprint!: Sprint;
  @ViewChild('chartRef', { read: ElementRef }) chartRef!: ElementRef;

  hasData: boolean = false;
  chartData: any;
  chartOptions: any;

  constructor() {
    this.initializeChartOptions();
  }

  ngAfterViewInit() {}

  ngOnChanges() {
    this.processSprintData();
  }

  private initializeChartOptions() {
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          labels: {
            color: '#495057',
            font: {
              weight: 500,
              size: 13,
            },
          },
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            title: (context: any) => {
              const date = new Date(context[0].parsed.x);
              return date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              });
            },
          },
        },
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'dd/MM',
            },
          },
          title: {
            display: true,
            text: 'Data',
            font: {
              size: 14,
              weight: 500,
            },
          },
          grid: {
            color: '#ebedef',
          },
          ticks: {
            source: 'auto',
            color: '#495057',
            maxRotation: 45,
          },
          min: undefined,
          max: undefined,
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Story Points',
            font: {
              size: 14,
              weight: 500,
            },
          },
          grid: {
            color: '#ebedef',
          },
          ticks: {
            color: '#495057',
            precision: 0,
          },
        },
      },
    };
  }

  private processSprintData() {
    if (!this.sprint) {
      this.hasData = false;
      return;
    }

    const startDate = new Date(this.sprint.start_date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(this.sprint.end_date);
    endDate.setHours(23, 59, 59, 999);

    this.chartOptions.scales.x.min = startDate;
    this.chartOptions.scales.x.max = endDate;

    this.chartOptions.scales.x.ticks.autoSkip = true;
    this.chartOptions.scales.x.time.unit = 'day';

    const cards = this.getAllCards();

    const totalPoints = this.calculateTotalPoints(
      cards.filter((c) => c.story_point && c.story_point > 0)
    );

    if (totalPoints === 0) {
      this.hasData = false;
      return;
    }

    const idealBurndown = this.calculateIdealBurndown(totalPoints);
    const actualBurndown = this.calculateActualBurndown(cards, totalPoints);

    this.chartData = {
      datasets: [
        {
          label: 'Ideal Burndown',
          data: idealBurndown.map((d) => ({
            x: d.date,
            y: Math.round(d.points * 100) / 100,
          })),
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Actual Burndown',
          data: actualBurndown.map((d) => ({
            x: d.date,
            y: Math.round(d.points * 100) / 100,
          })),
          borderColor: '#2196F3',
          backgroundColor: 'rgba(33, 150, 243, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };

    this.hasData = true;
  }

  private getAllCards(): Card[] {
    const cards: Card[] = [];
    this.sprint.section.lists.forEach((list: List) => {
      cards.push(...list.cardList);
    });
    return cards;
  }

  private calculateTotalPoints(cards: Card[]): number {
    return cards.reduce((sum, card) => sum + (card.story_point || 0), 0);
  }

  private areCardsValid(cards: Card[]): boolean {
    return cards.some(
      (card) => card.story_point && card.story_point > 0 && card.end_at
    );
  }

  private calculateIdealBurndown(totalPoints: number): ChartData[] {
    const startDate = new Date(this.sprint.start_date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(this.sprint.end_date);
    endDate.setHours(23, 59, 59, 999);

    const totalDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const pointsPerDay = totalPoints / totalDays;

    const burndown: ChartData[] = [];

    burndown.push({
      date: new Date(startDate),
      points: totalPoints,
    });

    for (let i = 1; i < totalDays; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      burndown.push({
        date,
        points: totalPoints - pointsPerDay * i,
      });
    }

    burndown.push({
      date: new Date(endDate),
      points: 0,
    });

    return burndown;
  }

  private calculateActualBurndown(
    cards: Card[],
    totalPoints: number
  ): ChartData[] {
    const startDate = new Date(this.sprint.start_date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(this.sprint.end_date);
    endDate.setHours(23, 59, 59, 999);

    const completions: { [dateKey: string]: number } = {};
    cards.forEach((card) => {
      if (card.story_point && card.story_point > 0 && card.end_at) {
        const d = new Date(card.end_at);
        d.setHours(0, 0, 0, 0);
        const key = d.toISOString();
        completions[key] = (completions[key] || 0) + (card.story_point || 0);
      }
    });

    const burndown: ChartData[] = [];
    const totalDays = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    let remaining = totalPoints;

    burndown.push({ date: new Date(startDate), points: remaining });

    for (let i = 1; i <= totalDays; i++) {
      const day = new Date(startDate);
      day.setDate(day.getDate() + i);
      day.setHours(0, 0, 0, 0);
      const key = day.toISOString();
      if (completions[key]) {
        remaining -= completions[key];
        if (remaining < 0) remaining = 0;
      }
      burndown.push({ date: new Date(day), points: remaining });
    }

    return burndown;
  }

  downloadChart(format: 'png' | 'xlsx') {
    if (format === 'png') {
      try {
        const canvas: HTMLCanvasElement | null =
          this.chartRef?.nativeElement?.querySelector('canvas');
        if (!canvas) {
          console.error('Canvas not found');
          return;
        }
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = `burndown-${this.sprint?.uuid || 'chart'}.png`;
        a.click();
      } catch (err) {
        console.error('Failed to export PNG', err);
      }
    } else if (format === 'xlsx' || format === 'csv') {
      try {
        const rows: string[] = [];

        const labels = ['date'];
        const datasets = this.chartData.datasets || [];
        datasets.forEach((ds: any) => labels.push(ds.label || 'series'));
        rows.push(labels.join(','));

        const dateSet = new Set<string>();
        datasets.forEach((ds: any) => {
          (ds.data || []).forEach((p: any) =>
            dateSet.add(new Date(p.x).toISOString())
          );
        });

        const dates = Array.from(dateSet).sort();
        dates.forEach((dIso) => {
          const row: string[] = [dIso];
          datasets.forEach((ds: any) => {
            const point = (ds.data || []).find(
              (p: any) => new Date(p.x).toISOString() === dIso
            );
            row.push(point ? String(point.y) : '');
          });
          rows.push(row.join(','));
        });

        const csv = rows.join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `burndown-${this.sprint?.uuid || 'chart'}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error('Failed to export CSV', err);
      }
    }
  }
}
