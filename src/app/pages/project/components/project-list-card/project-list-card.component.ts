import { Component, EventEmitter, Input, Output } from '@angular/core';
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

@Component({
  selector: 'app-project-list-card',
  imports: [Button, DialogModule, CommonModule, CardComponent, MenuModule,InputTextModule, IftaLabelModule, FormsModule],
  templateUrl: './project-list-card.component.html',
  styleUrl: './project-list-card.component.css',
})
export class ProjectListCardComponent {
  @Input() listData: List = {
    id: 0,
    uuid: "",
    title: '',
    position: 0,
    cardList: [],
    create_at: '',
  };

  loading: boolean = false;

  isCreateCardVisible: boolean = false;

  isEditLabelVisible: boolean = false;

  items: MenuItem[] = [
    { 
      id: 'edit_list', 
      label: 'Edit', 
      icon: 'pi pi-pen-to-square' ,
      command: () => this.showEditListDialog()
    },
    {
      id: 'delete_list',
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => this.onDeleteList(),
      styleClass: "deleteOption",
      iconStyle: {
        color: "red"
      }
    },
  ];

  cardDialogVisible = false;
  selectedCard: Card | null = null;

  constructor(private listService: ListService, private sectionService: SectionService) {}
  
  showEditListDialog(){
    this.isEditLabelVisible = true;
  }

  onEditList(){
    //TODO 
  }

  onDeleteList() {
    this.sectionService.deleteListFromCurrentSection(this.listData.uuid).subscribe();
  }


  showCreateCardDialog(){
    this.isCreateCardVisible = true;
  }


  openCardDialog(card: Card) {
    this.selectedCard = card;
    this.cardDialogVisible = true;
  }

  closeCardDialog() {
    this.cardDialogVisible = false;
    this.selectedCard = null;
  }

}
