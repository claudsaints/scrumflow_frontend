import { Component } from '@angular/core';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { Button } from "primeng/button";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [ Button, RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
