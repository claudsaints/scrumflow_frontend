import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { ProjectHeaderComponent } from './components/project-header/project-header.component';
import { ProjectSectionHeaderComponent } from './components/project-section-header/project-section-header.component';
import { ProjectSectionListComponent } from './components/project-section-list/project-section-list.component';
import { Project, Section } from '../../types';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/Project/project.service';
import { SectionService } from '../../services/Section/section.service';

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
  project: Project = {
    id: 0,
    title: '',
    description: '',
    create_at: '',
    owner: {
      email: '',
      name: '',
    },
    members: [],
    labels: [],
    sections: [{id: 0, title: "", description: ""}],
    sprints_ids: [],
  };

  selectedSectionId: number = 0;

  section: Section = {
    id: 0,
    description: '',
    title: '',
    lists: [],
  };

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private sectionService: SectionService
  ) {}

  ngOnInit(): void {
    this.setProject();
  
  }

  setProject(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.projectService.findProjectById(id).subscribe((p) => {
      this.project = p;
      this.selectedSectionId = p.sections[0].id;
      this.sectionService
      .findSectionById(this.selectedSectionId)
      .subscribe((s) => (this.section = s));
    });
  }

  handleSelectSectionChanges(id: number) {
    this.sectionService
      .findSectionById(id)
      .subscribe((s) => (this.section = s));
  }
}
