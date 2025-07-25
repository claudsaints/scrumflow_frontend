import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { Button, ButtonModule } from 'primeng/button';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../services/Auth/auth.service';
import { Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ToastModule } from 'primeng/toast';
import { FormHelperService } from '../../services/Form/form-helper.service';
import { Password, PasswordModule } from 'primeng/password';

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
    PasswordModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  loading: boolean = false;
  signUpForm: FormGroup<any>;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private formHelperService: FormHelperService
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
      let nameMessage = this.formHelperService.getErrorMessage(this.signUpForm.get('name'), 'name');
      let emailMessage = this.formHelperService.getErrorMessage(this.signUpForm.get('email'), 'email');
      let passwordMessage = this.formHelperService.getErrorMessage(this.signUpForm.get('password'),'password');

      nameMessage != null && this.formHelperService.showToast(nameMessage);
      emailMessage != null && this.formHelperService.showToast(emailMessage);
      passwordMessage != null && this.formHelperService.showToast(passwordMessage);
    }
  }

  async register() {
    const { name, email, password } = this.signUpForm.value;

    this.loading = true;

    this.auth.signUp(name, email, password).subscribe({
      next: () => {
        console.log('SignUp has Success');
        this.router.navigate(['/signin'], { queryParams: { email, password } });
      },
      error: (err) => {
        console.error(`Error SignUP: ${err}`);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
