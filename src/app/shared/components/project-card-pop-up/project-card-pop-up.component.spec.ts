import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCardPopUpComponent } from './project-card-pop-up.component';

describe('ProjectCardPopUpComponent', () => {
  let component: ProjectCardPopUpComponent;
  let fixture: ComponentFixture<ProjectCardPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCardPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCardPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
