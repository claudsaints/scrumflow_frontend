import { Component, Input } from '@angular/core';
import { Card } from '../../../types';
import { ProjectCardPopUpComponent } from "../project-card-pop-up/project-card-pop-up.component";

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
     @Input() card: Card = {} as Card;

}
