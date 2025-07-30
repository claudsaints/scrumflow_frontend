import { Component, Input } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { SectionService } from '../../../../services/Section/section.service';
import { Router, RouterModule } from '@angular/router';
import { SimpleSection } from '../../../../types';
import { DialogModule } from 'primeng/dialog';
import { IftaLabel, IftaLabelModule } from "primeng/iftalabel";
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-project-header',
  imports: [ButtonModule, RouterModule, DialogModule, IftaLabel,InputTextModule, IftaLabelModule],
  templateUrl: './project-header.component.html',
  styleUrl: './project-header.component.css'
})
export class ProjectHeaderComponent {

  @Input() projectId: string = "";

  isCreateSectionVisible: boolean = false;

  newSection: SimpleSection = {
    uuid: "",
    description: "",
    title: "",
  }
  
  constructor(private sectionService: SectionService){}

  createNewSection(){
    this.sectionService.create(this.newSection.title,this.newSection.description,this.projectId);
  }
  
  showCreateSectionDialog(){
    this.isCreateSectionVisible = true;
  }
}
