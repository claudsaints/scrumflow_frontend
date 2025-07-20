import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Button } from "primeng/button";
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-project-section-header',
  imports: [Button, CascadeSelectModule, CommonModule, FormsModule,DropdownModule, ButtonModule],
  templateUrl: './project-section-header.component.html',
  styleUrl: './project-section-header.component.css'
})
export class ProjectSectionHeaderComponent {
  sections = [
    { label: 'Sprint 1', value: 'sprint1' },
    { label: 'Sprint 2', value: 'sprint2' },
    { label: 'Sprint 3', value: 'sprint3' }
  ];

  selectedSection!: string;

  onSprintChange(event: any) {
    console.log('Selected Sprint:', event.value);
  }
}
