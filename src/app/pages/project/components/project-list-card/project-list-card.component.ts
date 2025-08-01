import { Component, Input, OnInit } from '@angular/core';
import { Card, List } from '../../../../types';
import { Button } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { MenuModule } from 'primeng/menu';
import { ListService } from '../../../../services/List/list.service';
import { InputTextModule } from 'primeng/inputtext';
import { SectionService } from '../../../../services/Section/section.service';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormsModule } from '@angular/forms';
import {
  DialogComponent,
  IDialog,
} from '../../../../shared/components/dialog/dialog.component';
import { Subscription } from 'rxjs';
import { DragControlService } from '../../../../services/Drag/drag-control.service';
import { CardService } from '../../../../services/Card/card.service';
import { ProjectListCardBase } from './project-list-card-base';

@Component({
  selector: 'app-project-list-card',
  imports: [
    Button,
    DialogModule,
    CommonModule,
    CardComponent,
    MenuModule,
    InputTextModule,
    IftaLabelModule,
    FormsModule,
    DialogComponent,
  ],
  templateUrl: './project-list-card.component.html',
  styleUrl: './project-list-card.component.css',
})
export class ProjectListCardComponent extends ProjectListCardBase implements OnInit{
  @Input() listData: List = {} as List;

  constructor(
    private listService: ListService,
    private sectionService: SectionService,
    private dragService: DragControlService,
    private cardService: CardService
  ) {
    super();
  }

  ngOnInit(): void {
    this.sectionSubscription = this.sectionService.section$.subscribe();
  }

  onEditList() {
    this.loading = true;

    this.listService
      .updateTitle(this.listData.uuid, this.editListDialogData.inputModel)
      .subscribe({
        next: () => {
          this.sectionService.reloadSection().subscribe();
        },
        complete: () => {
          this.loading = false;
          this.editListDialogData.visible = false;
        },
      });
  }

  showCreateCardDialog() {
    this.newCardDialogData.visible = true;
  }
  
  override onDeleteList() {
    this.sectionService
      .deleteListFromCurrentSection(this.listData.uuid)
      .subscribe();
  }
  
  override showEditListDialog() {
    this.editListDialogData.visible = true;
  }

  createNewCard() {
    this.cardService
      .create(this.listData.uuid, this.newCardDialogData.inputModel)
      .subscribe({
        next: (card) => {
          this.listData.cardList.push(card);
        },
        complete: () => {
          this.loading = false;
          this.newCardDialogData.visible = false;
        },
      });
  }

  openCardDialog(card: Card) {
    this.dragService.setDragDisabled(true);
    this.selectedCard = card;
    this.cardDialogVisible = true;
  }

  closeCardDialog() {
    this.dragService.setDragDisabled(false);
    this.cardDialogVisible = false;
    this.selectedCard = {} as Card;
  }
}
