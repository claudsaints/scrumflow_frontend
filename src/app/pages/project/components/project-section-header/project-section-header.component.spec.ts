import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSectionHeaderComponent } from './project-section-header.component';

describe('ProjectSectionHeaderComponent', () => {
  let component: ProjectSectionHeaderComponent;
  let fixture: ComponentFixture<ProjectSectionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSectionHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
