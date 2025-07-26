import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from "../../shared/components/navigation/navigation.component";
import { Button } from "primeng/button";
import { ProjectService } from '../../services/Project/project.service';
import { ProjectDTO } from '../../types';

@Component({
  selector: 'app-home',
  imports: [NavigationComponent, Button],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  projects: ProjectDTO [] = [];

  constructor(private projectService: ProjectService ){}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.findUserProjects().subscribe( p => this.projects = p);

  }
}
