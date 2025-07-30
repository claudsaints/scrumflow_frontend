import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { ProjectHeaderComponent } from './components/project-header/project-header.component';
import { ProjectSectionHeaderComponent } from './components/project-section-header/project-section-header.component';
import { ProjectSectionListComponent } from './components/project-section-list/project-section-list.component';
import { Project, Section } from '../../types';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/Project/project.service';
import { SectionService } from '../../services/Section/section.service';
import { ListService } from '../../services/List/list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project',
  imports: [
    NavigationComponent,
    ProjectHeaderComponent,
    ProjectSectionHeaderComponent,
    ProjectSectionListComponent,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent implements OnInit {



  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private sectionService: SectionService  
  ) {}

  ngOnInit(): void {
    this.setProject();
  }

  setProject(): void {
    const uuid = String(this.route.snapshot.paramMap.get('id'));
    this.projectService.findProjectById(uuid).subscribe((p) => {
      this.sectionService.findSectionById(p.sections[0].uuid).subscribe({
      next: () => console.log(`Seção carregada com sucesso.`),
      error: (err) => console.error(err)
    });
    });
  }


}
