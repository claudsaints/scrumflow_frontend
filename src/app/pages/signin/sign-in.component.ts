import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/Auth/auth.service';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormHelperService } from '../../services/Form/form-helper.service';
import { Toast } from "primeng/toast";
import {PasswordModule} from "primeng/password"
@Component({
  selector: 'app-sign-in',
  imports: [InputTextModule, CommonModule, LoadingSpinnerComponent, Toast,ReactiveFormsModule,PasswordModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  loading: boolean = false;
  signInForm: FormGroup<any>;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formHelperService: FormHelperService
  ) {
    this.signInForm = this.fb.group({
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
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const email = params['email'];
      const password = params['password'];

      email && this.signInForm.patchValue({ email });
      password && this.signInForm.patchValue({ password });
    });
  }

  async onSubmit() {
    if (this.signInForm.valid) {
      this.login();
    } else {
      let emailMessage = this.formHelperService.getErrorMessage(
        this.signInForm.get('email'),
        'email'
      );
      let passwordMessage = this.formHelperService.getErrorMessage(
        this.signInForm.get('password'),
        'password'
      );

      emailMessage != null && this.formHelperService.showToast(emailMessage);
      passwordMessage != null && this.formHelperService.showToast(passwordMessage);
    }
  }

  async login() {
    const { email, password } = this.signInForm.value;

    this.loading = true;

    this.auth.signIn(email, password).subscribe({
      next: () => {
        console.log('SignIn has Success');
        this.router.navigate(['/home']);
      },

      error: (err) => {
        console.error(`Error SignIN: ${err}`);
      },

      complete: () => {
        this.loading = false;
      },
    });
  }
}
