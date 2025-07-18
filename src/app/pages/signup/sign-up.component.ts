import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from "primeng/button";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message'; 

@Component({
  selector: 'app-sign-up',
  imports: [InputTextModule, Button, ReactiveFormsModule, CommonModule, MessageModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log('Form submitted:', this.signUpForm.value);
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }
}
