import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from "primeng/button";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message'; 
import { AuthService } from '../../services/auth.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [InputTextModule, Button, ReactiveFormsModule, CommonModule, MessageModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUpForm: FormGroup<any>;

  constructor(private fb: FormBuilder, private auth:AuthService, private router: Router) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.signUpForm.valid) {

      const {name,email,password} = this.signUpForm.value;

      this.auth.signUp(name,email,password).subscribe({
        next: () => {
          console.log("Sucesso no login")
          this.router.navigate(["/signin"], {queryParams: { email, password}});
        },
        error: err => {
          console.log(`Error SignUP: ${err}`);

        }
      })

    } else {
      this.signUpForm.markAllAsTouched();
    }
  }
}
