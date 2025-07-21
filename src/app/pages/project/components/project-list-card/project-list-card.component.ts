
import { Component, Input } from '@angular/core';
import { Card, List } from '../../../../types';
import { DragScrollComponent } from "ngx-drag-scroll";
import { Button } from "primeng/button";
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-project-list-card',
  imports: [ Button, DialogModule, CommonModule, CardComponent],
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
  };

  cardDialogVisible = false;
  selectedCard: Card | null = null;

  openCardDialog(card: Card) {
    this.selectedCard = card;
    this.cardDialogVisible = true;
  }

  closeCardDialog() {
    this.cardDialogVisible = false;
    this.selectedCard = null;
  }
}
