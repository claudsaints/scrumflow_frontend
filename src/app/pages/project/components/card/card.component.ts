import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-card',
  imports: [DialogModule, ButtonModule, CommonModule, FormsModule, InputTextModule, ColorPickerModule, SelectButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() card: any;
  @Input() visible: boolean = false;
  @Input() onClose: (() => void) | undefined;

  isMobile = false;
  popupStyle: any = {};
  pokerOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '5', value: 5 },
    { label: '8', value: 8 },
    { label: '13', value: 13 },
    { label: '21', value: 21 },
    { label: '?', value: '?' }
  ];

  ngOnInit() {
    this.isMobile = window.innerWidth <= 600;
    this.popupStyle = this.isMobile
      ? { width: '100vw', height: '100vh', maxWidth: '100vw', maxHeight: '100vh', borderRadius: '0', padding: '0' }
      : { width: '80vw', height: '80vh', maxWidth: '600px', maxHeight: '90vh', borderRadius: '16px', padding: '0' };
  }

  closeDialog() {
    if (this.onClose) this.onClose();
  }
}
