import { Component, OnInit } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { Button } from "primeng/button";
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-navigation',
  imports: [IconFieldModule, Button, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {
  
  isOnProject: boolean = false;
  
  projectId: string = "";

  constructor(private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.showProjectNavigation();
  }
  

  showProjectNavigation():void{
    const checkRoute = this.router.url.includes("project") ||  this.router.url.includes("config");

    if (checkRoute){
      this.isOnProject = true;
      this.projectId = String(this.route.snapshot.paramMap.get('id'));
    }
  }

}
