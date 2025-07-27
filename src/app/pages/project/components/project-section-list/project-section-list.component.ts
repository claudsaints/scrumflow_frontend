import { Component, Input } from '@angular/core';
import { ProjectListCardComponent } from "../project-list-card/project-list-card.component";
import { List, Project } from '../../../../types';
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';

@Component({
  selector: 'app-project-section-list',
  imports: [ProjectListCardComponent,     DragScrollComponent,
],
  templateUrl: './project-section-list.component.html',
  styleUrl: './project-section-list.component.css'
})
export class ProjectSectionListComponent {
  @Input() lists: List[] = [{
    id: 0,
    cardList: [],
    create_at: "",
    position: 0,
    title: ""
  }];
    
} 
