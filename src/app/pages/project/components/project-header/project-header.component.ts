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
import { IDialog, DialogComponent } from '../../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-project-header',
  imports: [
    ButtonModule,
    RouterModule,
    DialogModule,
    InputTextModule,
    IftaLabelModule,
    FormsModule,
    DialogComponent
],
  templateUrl: './project-header.component.html',
  styleUrl: './project-header.component.css',
})
export class ProjectHeaderComponent implements OnInit {
  projectId: string = '';

  loading = false;

  isCreateSectionVisible: boolean = false;



  dialogData: IDialog = {
    inputModel: "",
    header: "Create New Section",
    goButtonLabel: "Create",
    returnButtonLabel: "Cancel",
    inputId: "nameCreateSection",
    inputLabel: "Section Name",
    visible: false
  }

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
        this.dialogData.inputModel,
        "",
        this.projectId
      )
      .subscribe({
        next: () => {
          this.projectService.findProjectById(this.projectId).subscribe();
          this.dialogData.visible = false;
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
    this.dialogData.visible = true;
  }
}
