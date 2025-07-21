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
  @Input() lists: List[] = [
       {
        "id": 2,
        "title": "Done",
        "position": 1,
        "create_at": "2025-07-19T15:07:12.272967Z",
        "cardList": []
      },
      {
        "id": 1,
        "title": "To Do",
        "position": 0,
        "create_at": "2025-07-19T15:07:12.272967Z",
        "cardList": [
          {
            "title": "criar repositories",
            "description": null
          },
          {
            "title": "criar entidades",
            "description": null
          },
           {
            "title": "criar repositories",
            "description": null
          },
           {
            "title": "criar repositories",
            "description": null
          },
           {
            "title": "criar repositories",
            "description": null
          }, {
            "title": "criar repositories",
            "description": null
          },
           {
            "title": "criar repositories",
            "description": null
          }, {
            "title": "criar repositories",
            "description": null
          }, {
            "title": "criar repositories",
            "description": null
          },
        ]
      }
    ]
    
} 
