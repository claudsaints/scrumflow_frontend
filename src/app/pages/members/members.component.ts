import { Component } from '@angular/core';
import { NavigationComponent } from "../../shared/components/navigation/navigation.component";
import { BreadCrumbComponent } from "../../shared/components/bread-crumb/bread-crumb.component";

@Component({
  selector: 'app-members',
  imports: [NavigationComponent, BreadCrumbComponent],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent {

}
