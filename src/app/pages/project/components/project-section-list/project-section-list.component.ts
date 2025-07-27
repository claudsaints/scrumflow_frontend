import { Component, Input, OnInit } from '@angular/core';
import { ProjectListCardComponent } from "../project-list-card/project-list-card.component";
import { List } from '../../../../types';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { ListService } from '../../../../services/List/list.service';

@Component({
  selector: 'app-project-section-list',
  imports: [ProjectListCardComponent,     DragScrollComponent,
],
  templateUrl: './project-section-list.component.html',
  styleUrl: './project-section-list.component.css'
})
export class ProjectSectionListComponent{
  @Input() lists: List[] = [{
    id: 0,
    cardList: [],
    create_at: "",
    position: 0,
    title: ""
  }];

  constructor(private listService:ListService){}

  handlerDeleteList(listId: number){
    this.listService.delete(listId)
    .subscribe({
      next: () =>{
        this.lists = this.lists.filter(l => l.id != listId);
      },
      error(err) {
        console.log(err)
      },
    });
  
  }

 

    
} 
