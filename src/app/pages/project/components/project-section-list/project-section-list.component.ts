import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ProjectListCardComponent } from '../project-list-card/project-list-card.component';
import { List } from '../../../../types';
import { SectionService } from '../../../../services/Section/section.service';
import { Subscription } from 'rxjs';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Button } from 'primeng/button';
import { ListService } from '../../../../services/List/list.service';
import { DragControlService } from '../../../../services/Drag/drag-control.service';

@Component({
  selector: 'app-project-section-list',
  imports: [ProjectListCardComponent, DragDropModule, Button],
  templateUrl: './project-section-list.component.html',
  styleUrl: './project-section-list.component.css',
})
export class ProjectSectionListComponent implements OnInit {
  @Input() lists: List[] = [
    {
      id: 0,
      uuid: '',
      cardList: [],
      create_at: '',
      position: 0,
      title: '',
    },
  ];

  @ViewChild('nav') listContainer!: ElementRef;

  public sectionUuid: string = '';

  public dragDisabled: boolean = false;

  private sectionSubscription: Subscription | undefined;

  constructor(
    private sectionService: SectionService,
    private listService: ListService,
    private dragService: DragControlService
  ) {}

  ngOnInit(): void {
    this.subscribe();
  }

  drop(event: CdkDragDrop<List[]>) {
    if (event.previousIndex != event.currentIndex) {
      this.listService
        .updatePosition(
          this.sectionUuid,
          this.lists[event.previousIndex].uuid,
          event.currentIndex
        )
        .subscribe();

      moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
    }
  }

  ngAfterViewInit() {
    if (this.listContainer) {
      this.listContainer.nativeElement.style.scrollBehavior = 'smooth';
    }
  }

  moveLeft() {
    this.listContainer.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  }

  moveRight() {
    this.listContainer.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  }

  subscribe(): void {
    this.sectionSubscription = this.sectionService.section$.subscribe(
      (section) => {
        this.lists = section.lists;
        this.sectionUuid = section.uuid;
      }
    );

    this.dragService.dragDisabled$.subscribe((value) => {
      this.dragDisabled = value;
    });
  }
}
