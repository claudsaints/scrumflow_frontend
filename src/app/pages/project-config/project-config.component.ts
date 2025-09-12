import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { BreadCrumbComponent } from '../../shared/components/bread-crumb/bread-crumb.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';
import { Project } from '../../types/project';

interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    thumb: string;
  };
}

@Component({
  selector: 'app-project-config',
  standalone: true,
  imports: [
    NavigationComponent,
    BreadCrumbComponent,
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,

    ToastModule,
    SkeletonModule,
  ],
  templateUrl: './project-config.component.html',
  styleUrl: './project-config.component.css',
  providers: [MessageService],
})
export class ProjectConfigComponent implements OnInit {
  projectForm: FormGroup;
  loading: boolean = true;
  loadingImages: boolean = true;
  saving: boolean = false;
  backgroundImages: UnsplashImage[] = [];
  selectedImageUrl: string | null = null;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      backgroundImage: [''],
    });
  }

  ngOnInit() {
    setTimeout(() => {
      const mockProject: Project = {
        id: 1,
        uuid: '123',
        title: 'Sample Project',
        description: 'This is a sample project description',
        backgroundImage:
          'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
        create_at: new Date().toISOString(),
        owner: {
          name: 'John Doe',
          email: 'john@example.com',
        },
        members: [],
        labels: [],
        sections: [
          {
            uuid: '1',
            title: 'Todo',
            description: 'Tasks to do',
          },
        ],
        sprints_ids: [],
      };

      this.projectForm.patchValue({
        title: mockProject.title,
        description: mockProject.description,
        backgroundImage: mockProject.backgroundImage,
      });

      this.selectedImageUrl = mockProject.backgroundImage ?? null;
      this.loading = false;

      this.fetchBackgroundImages();
    }, 1000);
  }

  fetchBackgroundImages() {
    setTimeout(() => {
      this.backgroundImages = [
        {
          id: '1',
          urls: {
            regular:
              'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
            thumb:
              'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=200',
          },
        },
        {
          id: '2',
          urls: {
            regular:
              'https://images.unsplash.com/photo-1557683316-973673baf926',
            thumb:
              'https://images.unsplash.com/photo-1557683316-973673baf926?w=200',
          },
        },
        {
          id: '3',
          urls: {
            regular:
              'https://images.unsplash.com/photo-1557683311-eeb2023a32d0',
            thumb:
              'https://images.unsplash.com/photo-1557683311-eeb2023a32d0?w=200',
          },
        },
        {
          id: '4',
          urls: {
            regular:
              'https://images.unsplash.com/photo-1557682250-33bd709cbe85',
            thumb:
              'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=200',
          },
        },
      ];
      this.loadingImages = false;
    }, 1500);
  }

  selectImage(image: UnsplashImage) {
    this.selectedImageUrl = image.urls.regular;
    this.projectForm.patchValue({ backgroundImage: image.urls.regular });
  }

  saveProject() {
    if (this.projectForm.valid) {
      this.saving = true;

      setTimeout(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Project settings updated successfully',
        });
        this.saving = false;
      }, 1000);
    }
  }
}
