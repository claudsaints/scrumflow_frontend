import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IftaLabel, IftaLabelModule } from "primeng/iftalabel";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

export interface IDialog{
  inputModel: string;
  header: string;
  visible: boolean;
  inputId: string;
  inputLabel: string;
  returnButtonLabel: string;
  goButtonLabel: string;
}
 

@Component({
  selector: 'app-dialog',
  imports: [IftaLabel, DialogModule, ButtonModule,DialogModule,
    IftaLabel,
    InputTextModule,
    IftaLabelModule,
    FormsModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  @Input() data!: IDialog;

  @Input() loading!: boolean;

  @Output() setButtonAction: EventEmitter<any> = new EventEmitter<any>();



  onClick(){
    this.setButtonAction.emit();
  }

  
}
