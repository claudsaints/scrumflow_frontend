import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { Button, ButtonModule } from "primeng/button";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message'; 
import { AuthService } from '../../services/auth.service';
import {  Router } from '@angular/router';
import { tree } from '@primeuix/themes/aura/treeselect';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingSpinnerComponent } from "../../shared/components/loading-spinner/loading-spinner.component";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-up',
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule, CommonModule, MessageModule, ProgressSpinnerModule, LoadingSpinnerComponent,ToastModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent  {
  signUpForm: FormGroup<any>;

  loading: boolean = false;

  constructor(private fb: FormBuilder, private auth:AuthService, private router: Router,private messageService: MessageService) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.signUpForm.valid) {
      this.register();
    } else {
      this.showToast();
      this.signUpForm.markAllAsTouched();

    }
  }

  showToast() { 
    this.messageService.add({severity: 'success', summary:  'Heading', detail: 'More details....' });
  }

  async register(){
      const {name,email,password} = this.signUpForm.value;

      this.loading = true;

      this.auth.signUp(name,email,password).subscribe({
        next: () => {
          console.log("Sucesso no login")
          this.router.navigate(["/signin"], {queryParams: { email, password}});
        },
        error: err => {
          console.log(`Error SignUP: ${err}`);
        },
        complete: () => {
          this.loading = false;
        }
      })
  }
}
