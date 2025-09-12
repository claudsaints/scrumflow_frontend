import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sprint } from '../../../../types/sprint';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-sprint-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, TooltipModule, SkeletonModule],
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.css'],
  
})
export class SprintListComponent {
  @Input() sprints: Sprint[] = [];
  @Input() selectedSprint: Sprint | null = null;
  @Input() loading = false;
  @Input() isAdmin = false;

  @Output() onSelectSprint = new EventEmitter<Sprint>();
  @Output() onNewSprint = new EventEmitter<void>();
}
