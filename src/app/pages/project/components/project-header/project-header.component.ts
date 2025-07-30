import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SectionService } from '../../../../services/Section/section.service';
import { Router, RouterModule } from '@angular/router';
import { Project, SimpleSection } from '../../../../types';
import { DialogModule } from 'primeng/dialog';
import { IftaLabel, IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../../services/Project/project.service';

@Component({
  selector: 'app-project-header',
  imports: [
    ButtonModule,
    RouterModule,
    DialogModule,
    IftaLabel,
    InputTextModule,
    IftaLabelModule,
    FormsModule,
  ],
  templateUrl: './project-header.component.html',
  styleUrl: './project-header.component.css',
})
export class ProjectHeaderComponent implements OnInit {
  projectId: string = '';

  loading = false;

  isCreateSectionVisible: boolean = false;

  newSection: SimpleSection = {
    uuid: '',
    description: '',
    title: '',
  };

  constructor(
    private sectionService: SectionService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.projectService.project$.subscribe((project) => {
      this.projectId = project.uuid;
    });
  }

  createNewSection() {
    this.loading = true;
    this.sectionService
      .create(
        this.newSection.title,
        this.newSection.description,
        this.projectId
      )
      .subscribe({
        next: () => {
          this.projectService.findProjectById(this.projectId).subscribe();
          this.isCreateSectionVisible = false;
        },
        error(err) {
          console.error(err);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  showCreateSectionDialog() {
    this.isCreateSectionVisible = true;
  }
}
