import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProjectListCardComponent } from "../project-list-card/project-list-card.component";
import { List, Section } from '../../../../types';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { SectionService } from '../../../../services/Section/section.service';
import { Subscription } from 'rxjs';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-project-section-list',
  imports: [ProjectListCardComponent,     DragScrollComponent, DragDropModule
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
  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;




  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
  }


  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  moveTo(index: number) {
    this.ds.moveTo(index);
  }

  ngAfterViewInit() {
    // Starting ngx-drag-scroll from specified index(3)
    setTimeout(() => {
      this.ds.moveTo(3);
    }, 0);
  }

 

    
} 
