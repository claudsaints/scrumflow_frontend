import { Component, Input, input } from '@angular/core';
import { Card, List } from '../../../../types';
import { DragScrollComponent } from "ngx-drag-scroll";
import { Button } from "primeng/button";

@Component({
  selector: 'app-project-list-card',
  imports: [DragScrollComponent, Button],
  templateUrl: './project-list-card.component.html',
  styleUrl: './project-list-card.component.css'
})
export class ProjectListCardComponent {
  @Input() listData: List = {
    id: 0,
    title: '',
    position: 0,
    cardList: [],
    create_at: ''
  }
}
