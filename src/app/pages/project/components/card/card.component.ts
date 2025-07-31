import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CardService } from '../../../../services/Card/card.service';
import { Card, UpdateCardDto } from '../../../../types';
@Component({
  selector: 'app-card',
  imports: [DialogModule, ButtonModule, CommonModule, FormsModule, InputTextModule, ColorPickerModule, SelectButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() card: Card = {} as Card;
  @Input() visible: boolean = false;
  @Input() onClose: (() => void) | undefined;

  isMobile = false;
  popupStyle: any = {};
  pokerOptions = [
    { label: '1', value: 1, imgSrc: '/1_poker.png' },
    { label: '2', value: 2, imgSrc: '/2_poker.png' },
    { label: '3', value: 3 , imgSrc: '/3_poker.png'},
    { label: '5', value: 5 , imgSrc: '/5_poker.png'},
    { label: '8', value: 8 , imgSrc: '/8_poker.png'},
    { label: '13', value: 13 , imgSrc: '/13_poker.png'},
    { label: '21', value: 21, imgSrc: '/21_poker.png' },
    { label: '?', value: 0, imgSrc: '/java_poker.png' }
  ];

  constructor(private cardService: CardService){}

  ngOnInit() {
    this.isMobile = window.innerWidth <= 600;
    this.popupStyle = this.isMobile
      ? { width: '100vw', height: '100vh', maxWidth: '100vw', maxHeight: '100vh', borderRadius: '0', padding: '0' }
      : { width: '80vw', height: '80vh', maxWidth: '600px', maxHeight: '90vh', borderRadius: '16px', padding: '0' };
  }

  closeDialog() {
    if (this.onClose) this.onClose();
  }

  saveCard() {
    //TODO REVISAR    

    let updatedCard:UpdateCardDto = {
      ...this.card,
      storyPoint: this.card.story_point,
      startAt: new Date(this.card.start_at).toISOString(),
      endAt: new Date(this.card.end_at).toISOString(),
      labels: []
    }

    this.cardService.update(this.card.uuid, updatedCard).subscribe({
      next: (card) => {
        this.card = card;
      },
      complete: () => {
        this.closeDialog();
      },
    });

    
  }
}
