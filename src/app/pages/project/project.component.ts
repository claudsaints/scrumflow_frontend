import { Component } from '@angular/core';
import { NavigationComponent } from "../../shared/components/navigation/navigation.component";
import { ProjectHeaderComponent } from "./components/project-header/project-header.component";
import { ProjectSectionHeaderComponent } from "./components/project-section-header/project-section-header.component";
import { ProjectSectionListComponent } from "./components/project-section-list/project-section-list.component";

@Component({
  selector: 'app-project',
  imports: [ NavigationComponent, ProjectHeaderComponent, ProjectSectionHeaderComponent, ProjectSectionListComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  project = {
    "id": 2,
    "title": "scrumflow",
    "description": "a scrum + kanban app",
    "create_at": "2025-07-19T15:07:12.178971Z",
    "owner": {
      "name": "claudio",
      "email": "claudio@gmail.com"
    },
    "members": [
      {
        "role": "ADMIN",
        "user": {
          "name": "pedro",
          "email": "pedro@gmail.com"
        },
        "join_at": "2025-07-19T15:07:12.191971Z"
      },
      {
        "role": "MEMBER",
        "user": {
          "name": "claudio",
          "email": "claudio@gmail.com"
        },
        "join_at": "2025-07-19T15:07:12.191971Z"
      },
      {
        "role": "OWNER",
        "user": {
          "name": "maria",
          "email": "maria@gmail.com"
        },
        "join_at": "2025-07-19T15:07:12.191971Z"
      }
    ],
    "lists": [
       {
        "id": 2,
        "title": "Done",
        "position": 1,
        "create_at": "2025-07-19T15:07:12.272967Z",
        "cardList": []
      },
       {
        "id": 2,
        "title": "Done",
        "position": 1,
        "create_at": "2025-07-19T15:07:12.272967Z",
        "cardList": []
      },
       {
        "id": 2,
        "title": "Done",
        "position": 1,
        "create_at": "2025-07-19T15:07:12.272967Z",
        "cardList": []
      },
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
          }
        ]
      }
    ],
    "labels": [],
    "sprints": []
  }
}
