import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Section } from '../../../../types/section';

@Component({
  selector: 'app-sprint-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    InputTextModule
  ],
  templateUrl: './sprint-form.component.html',
  styleUrls: ['./sprint-form.component.css'],
})
export class SprintFormComponent {
  @Input() visible = false;
  @Input() sections: Section[] = [];
  @Input() form!: FormGroup;
  @Input() selectedSprint: any = null;

  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<void>();
}
