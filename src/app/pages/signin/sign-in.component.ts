import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from "primeng/button";
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-sign-in',
  imports: [InputTextModule, Button],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  
  constructor(){}


}
