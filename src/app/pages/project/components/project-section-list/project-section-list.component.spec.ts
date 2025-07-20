import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSectionListComponent } from './project-section-list.component';

describe('ProjectSectionListComponent', () => {
  let component: ProjectSectionListComponent;
  let fixture: ComponentFixture<ProjectSectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSectionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
