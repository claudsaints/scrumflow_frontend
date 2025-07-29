import { Component, Input } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { SectionService } from '../../../../services/Section/section.service';
import { Router, RouterModule } from '@angular/router';
import { SimpleSection } from '../../../../types';

@Component({
  selector: 'app-project-header',
  imports: [ButtonModule, RouterModule],
  templateUrl: './project-header.component.html',
  styleUrl: './project-header.component.css'
})
export class ProjectHeaderComponent {

  @Input() projectId: string = "";


  newSection: SimpleSection = {
    id: 0,
    uuid: "",
    description: "",
    title: "",
  }
  
  constructor(private sectionService: SectionService){}

  createNewSection(){
    this.sectionService.create(this.newSection.title,this.newSection.description,this.projectId);
  }
  
}
