import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ButtonModule } from 'primeng/button';
import { Section, SimpleSection } from '../../../../types';
import { SelectModule } from 'primeng/select';
import { SectionService } from '../../../../services/Section/section.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-project-section-header',
  imports: [CascadeSelectModule, CommonModule, FormsModule, SelectModule, ButtonModule],
  templateUrl: './project-section-header.component.html',
  styleUrl: './project-section-header.component.css'
})
export class ProjectSectionHeaderComponent implements OnInit{
  @Input() sections: SimpleSection[] = [{id: 0 , uuid: "",   title: "" ,description: ""}];
  
  selectedSection!: SimpleSection;

  sectionSubscription: Subscription | undefined;

  constructor(private sectionService: SectionService){}
  
  
  ngOnInit(): void {
    

    this.sectionSubscription = this.sectionService.section$.subscribe(section => {
      this.selectedSection = {
        id: section.id,
        uuid: section.uuid,
        title: section.title,
        description: section.description
      };  
    })
  }


  selectChange() {
     this.sectionService.findSectionById(this.selectedSection.uuid).subscribe();
  }

  buttonCLick(){
    this.sectionService.addListToCurrentSection("New List").subscribe();
  }


}
