import { Component, Input, OnInit } from '@angular/core';
import { ProjectListCardComponent } from "../project-list-card/project-list-card.component";
import { List, Section } from '../../../../types';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { SectionService } from '../../../../services/Section/section.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-section-list',
  imports: [ProjectListCardComponent,     DragScrollComponent,
],
  templateUrl: './project-section-list.component.html',
  styleUrl: './project-section-list.component.css'
})
export class ProjectSectionListComponent implements OnInit{
  @Input() lists: List[] = [{
    id: 0,
    uuid: "",
    cardList: [],
    create_at: "",
    position: 0,
    title: ""
  }];

  private sectionSubscription: Subscription | undefined

  constructor(private sectionService: SectionService){}

  ngOnInit(): void {
    this.sectionSubscription = this.sectionService.section$.subscribe( section => {
      this.lists = section.lists;
    })
  }

 

    
} 
