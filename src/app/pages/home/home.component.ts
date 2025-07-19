import { Component } from '@angular/core';
import { NavigationComponent } from "../../shared/components/navigation/navigation.component";
import { Button } from "primeng/button";

@Component({
  selector: 'app-home',
  imports: [NavigationComponent, Button],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  projects = [
  {
    "id": 1,
    "title": "virtual_shop",
    "description": "virtual website to buy things",
    "create_at": "2025-07-19T15:24:26.457435Z",
    "owner": {
      "name": "claudio",
      "email": "claudio@gmail.com"
    }
  },
  {
    "id": 2,
    "title": "scrumflow",
    "description": "a scrum + kanban app",
    "create_at": "2025-07-19T15:24:26.457435Z",
    "owner": {
      "name": "claudio",
      "email": "claudio@gmail.com"
    }
  }
]


}
