import { Component } from '@angular/core';
import { NavigationComponent } from "../../shared/components/navigation/navigation.component";
import { BreadCrumbComponent } from "../../shared/components/bread-crumb/bread-crumb.component";

@Component({
  selector: 'app-project-config',
  imports: [NavigationComponent, BreadCrumbComponent],
  templateUrl: './project-config.component.html',
  styleUrl: './project-config.component.css'
})
export class ProjectConfigComponent {

}
