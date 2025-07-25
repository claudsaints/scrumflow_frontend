import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class FormHelperService {

  constructor(private messageService: MessageService) { }

  getErrorMessage(
   fieldError: AbstractControl<any, any> | null, fieldName: string
  ): string | null {
    if (!fieldError || !fieldError.errors) return null;
    
    if (fieldError.errors['required']) {
      return `${fieldName} é obrigatório.`;
    }
    if (fieldError.errors['email']) {
      return `Formato de ${fieldName} inválido.`;
    }
    if (fieldError.errors['minlength']) {
      const required = fieldError.errors['minlength'].requiredLength;
      return `${fieldName} deve ter no mínimo ${required} caracteres.`;
    }
    if (fieldError.errors['maxlength']) {
      const required = fieldError.errors['maxlength'].requiredLength;
      return `${fieldName} deve ter no máximo ${required} caracteres.`;
    }

    return 'Erro desconhecido';
  }

  showToast(details: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Form Invalid',
      detail: `${details}`,
    });
  }
}
