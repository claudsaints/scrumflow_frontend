import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from "primeng/button";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from "../../shared/components/loading-spinner/loading-spinner.component";
@Component({
  selector: 'app-sign-in',
  imports: [InputTextModule, CommonModule, LoadingSpinnerComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
    loading: boolean = false;
  constructor(){}


}
