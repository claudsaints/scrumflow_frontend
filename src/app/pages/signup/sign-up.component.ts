import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { Button, ButtonModule } from 'primeng/button';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { tree } from '@primeuix/themes/aura/treeselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-up',
  imports: [
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MessageModule,
    ProgressSpinnerModule,
    LoadingSpinnerComponent,
    ToastModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  signUpForm: FormGroup<any>;

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(255),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ],
      ],
    });
  }

  async onSubmit() {
    if (this.signUpForm.valid) {
      this.register();
    } else {
      let name = this.signUpForm.get('name');
      let email = this.signUpForm.get('email');
      let password = this.signUpForm.get('password');

      let nameMessage = this.getErrorMessage(name, "name");
      let emailMessage = this.getErrorMessage(email, "email");
      let passwordMessage = this.getErrorMessage(password, "password");

      nameMessage != null && this.showToast(nameMessage);
      emailMessage != null && this.showToast(emailMessage);
      passwordMessage != null && this.showToast(passwordMessage);

      
    }
  }

  
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
  async register() {
    const { name, email, password } = this.signUpForm.value;
    
    this.loading = true;
    
    this.auth.signUp(name, email, password).subscribe({
      next: () => {
        console.log('Sucesso no login');
        this.router.navigate(['/signin'], { queryParams: { email, password } });
      },
      error: (err) => {
        console.log(`Error SignUP: ${err}`);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
