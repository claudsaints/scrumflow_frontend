import { Component } from '@angular/core';


import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup'; 
@Component({
  selector: 'app-navigation',
  imports: [AvatarGroupModule,AvatarModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

}
