import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class ProjectSectionHeaderComponent {
  @Input() sections: SimpleSection[] = [{id: 0 ,   title: "" ,description: ""}];

  selectedSection: SimpleSection = this.sections[0];

  @Output() changeSection: EventEmitter<number> = new EventEmitter<number>();

  selectChange() {
     this.changeSection.emit(this.selectedSection.id);
  }
}
