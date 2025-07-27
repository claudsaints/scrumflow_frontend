import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ButtonModule } from 'primeng/button';
import { Section, SimpleSection } from '../../../../types';
import { SelectModule } from 'primeng/select';
@Component({
  selector: 'app-project-section-header',
  imports: [CascadeSelectModule, CommonModule, FormsModule, SelectModule, ButtonModule],
  templateUrl: './project-section-header.component.html',
  styleUrl: './project-section-header.component.css'
})
export class ProjectSectionHeaderComponent implements OnInit{
  @Input() sections: SimpleSection[] = [{id: 0 ,   title: "" ,description: ""}];
  
  @Output() changeSection: EventEmitter<number> = new EventEmitter<number>();

  @Output() addNewList: EventEmitter<number>  = new EventEmitter<number>();
  
  selectedSection!: SimpleSection;
  
  
  ngOnInit(): void {
    this.selectedSection = this.sections[0];
  }


  selectChange() {
     this.changeSection.emit(this.selectedSection.id);
  }

  buttonCLick(){
    this.addNewList.emit(this.selectedSection.id);
  }


}
