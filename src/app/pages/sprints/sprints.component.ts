import { Component } from '@angular/core';
import { NavigationComponent } from "../../shared/components/navigation/navigation.component";
import { BreadCrumbComponent } from "../../shared/components/bread-crumb/bread-crumb.component";

@Component({
  selector: 'app-sprints',
  imports: [NavigationComponent, BreadCrumbComponent],
  templateUrl: './sprints.component.html',
  styleUrl: './sprints.component.css'
})
export class SprintsComponent {

}
