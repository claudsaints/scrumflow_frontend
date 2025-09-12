import { Component, OnInit } from '@angular/core';
import { BreadCrumbComponent } from '../../shared/components/bread-crumb/bread-crumb.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { BurndownChartComponent } from './components/burndown-chart/burndown-chart.component';
import { SprintListComponent } from './components/sprint-list/sprint-list.component';
import { SprintFormComponent } from './components/sprint-form/sprint-form.component';
import { Sprint } from '../../types/sprint';
import { Section } from '../../types/section';
import { SkeletonModule } from 'primeng/skeleton';
import { SprintService } from '../../services/Sprint/sprint.service';
import { SectionService } from '../../services/Section/section.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sprints',
  standalone: true,
  imports: [
    BreadCrumbComponent,
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    TooltipModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    BurndownChartComponent,
    SprintListComponent,
    SprintFormComponent
  ],
  templateUrl: './sprints.component.html',
  styleUrl: './sprints.component.css',
  providers: [MessageService],
})
export class SprintsComponent implements OnInit {
  sprints: Sprint[] = [];
  sections: Section[] = [];
  selectedSprint: Sprint | null = null;
  loading = true;
  showBurndown = false;
  isAdmin = true; 
  sprintForm: FormGroup;
  visible = false;
  projectId: string = ''; 
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private sprintService: SprintService,
    private sectionService: SectionService,
    private route: ActivatedRoute
  ) {
    this.sprintForm = this.fb.group({
      title: ['', [Validators.required]],
      goal: ['', [Validators.required]],
      section: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.projectId = this.route.snapshot.params['id'];
    this.loadSprints();
    this.loadSections();
  }

  private loadSprints() {
    this.loading = true;
    this.sprintService.findAllProjectSprints(this.projectId).subscribe({
      next: (sprints) => {
        this.sprints = sprints;
        if (sprints.length > 0) {
          this.selectSprint(sprints[0]);
        }
        this.loading = false;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load sprints'
        });
        this.loading = false;
      }
    });
  }

  private loadSections() {
    this.sectionService.getSections(this.projectId).subscribe({
      next: (sections) => {
        this.sections = sections;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load sections'
        });
      }
    });
  }

  selectSprint(sprint: Sprint) {
    this.selectedSprint = sprint;
    this.showBurndown = false;
  }

  showDialog(sprint?: Sprint) {
    this.sprintForm.reset();
    
    if (sprint) {
      const start = new Date(sprint.start_date);
      const end = new Date(sprint.end_date);

      this.sprintForm.patchValue({
        title: sprint.title,
        goal: sprint.goal,
        section: sprint.section,
        startDate: start,
        endDate: end
      });
      this.selectedSprint = sprint;
    } else {
      this.selectedSprint = null;
    }

    this.visible = true;
  }

  toggleBurndown() {
    this.showBurndown = !this.showBurndown;
  }

  saveSprint() {
    console.log('Form value before validation:', this.sprintForm.value);
    
    if (this.sprintForm.valid) {
      const formValue = this.sprintForm.value;
      
      
      if (!formValue.startDate || !formValue.endDate) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please select both start and end dates'
        });
        return;
      }

      
      const startDate = formValue.startDate instanceof Date ? 
        formValue.startDate : new Date(formValue.startDate);
      const endDate = formValue.endDate instanceof Date ? 
        formValue.endDate : new Date(formValue.endDate);

      
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid date format'
        });
        return;
      }

      const sprintData = {
        title: formValue.title,
        goal: formValue.goal,
        start: startDate.toISOString(), 
        end: endDate.toISOString(), 
        section: formValue.section 
      };

      console.log('Sprint data to be sent:', sprintData);
      this.loading = true;

      if (this.selectedSprint) {
        
        console.log('Dados do formulário:', this.sprintForm.value);
        console.log('Sprint Data:', sprintData);

        this.sprintService.updateSprintData(this.selectedSprint.uuid, sprintData).subscribe({
          next: (updatedSprint) => {
            const index = this.sprints.findIndex(s => s.uuid === updatedSprint.uuid);
            if (index !== -1) {
              this.sprints[index] = updatedSprint;
              this.selectedSprint = updatedSprint;
            }
            this.showSuccessMessage('Sprint updated successfully');
            this.visible = false; 
          },
          error: this.handleError.bind(this)
        });
      } else {
        const sectionId = formValue.section.uuid;
        this.sprintService.createSprint(this.projectId, sectionId, sprintData).subscribe({
          next: (newSprint) => {
            this.sprints.push(newSprint);
            this.selectedSprint = newSprint;
            this.showSuccessMessage('Sprint created successfully');
          },
          error: this.handleError.bind(this)
        });
      }
    }
  }

  private showSuccessMessage(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message
    });
    this.visible = false;
    this.loading = false;
  }

  private handleError(error: any) {
    console.error('Sprint operation failed:', error);
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Operation failed. Please try again.'
    });
    this.loading = false;
  }
}
