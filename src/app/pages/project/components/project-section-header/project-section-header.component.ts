import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ButtonModule } from 'primeng/button';
import { Section, SimpleSection } from '../../../../types';
import { SelectModule } from 'primeng/select';
import { SectionService } from '../../../../services/Section/section.service';
import { Subscription } from 'rxjs';
import { ProjectService } from '../../../../services/Project/project.service';
@Component({
  selector: 'app-project-section-header',
  imports: [CascadeSelectModule, CommonModule, FormsModule, SelectModule, ButtonModule],
  templateUrl: './project-section-header.component.html',
  styleUrl: './project-section-header.component.css'
})
export class ProjectSectionHeaderComponent implements OnInit{
  sections!: SimpleSection[];
  
  selectedSection!: SimpleSection;

  sectionSubscription: Subscription | undefined;

  projectSubscription: Subscription | undefined;

  constructor(private sectionService: SectionService, private projectService: ProjectService){}
  
  
  ngOnInit(): void {
    this.subscribeProject();
    this.subscribeSection();
  }


  selectChange() {
     this.sectionService.findSectionById(this.selectedSection.uuid).subscribe();
     console.log(this.selectedSection);
  }

  buttonCLick(){
    this.sectionService.addListToCurrentSection("New List").subscribe();
  }

  subscribeSection(){
    this.sectionSubscription = this.sectionService.section$.subscribe(section => {
      this.selectedSection = {
        uuid: section.uuid,
        title: section.title,
        description: section.description
      };  
    })
  }

  subscribeProject(){
    this.projectSubscription = this.projectService.project$.subscribe(project => {
      this.sections = project.sections;
    })
  }


}
