import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { BreadCrumbComponent } from '../../shared/components/bread-crumb/bread-crumb.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [
    NavigationComponent,
    BreadCrumbComponent,
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    SkeletonModule,
    ToastModule,
    CardModule,
    AvatarModule,
    TagModule,
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css',
  providers: [MessageService],
})
export class MembersComponent implements OnInit {
  members: Member[] = [];
  loading: boolean = true;
  isAdmin: boolean = true;
  visible: boolean = false;
  inviteForm: FormGroup;
  roles: any[] = [
    { label: 'Developer', value: 'developer' },
    { label: 'Product Owner', value: 'product_owner' },
    { label: 'Scrum Master', value: 'scrum_master' },
  ];

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.inviteForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.members = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'Developer',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'Product Owner',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
        },
      ];
      this.loading = false;
    }, 1500);
  }

  showInviteDialog() {
    this.visible = true;
  }

  inviteMember() {
    if (this.inviteForm.valid) {
      this.loading = true;
      setTimeout(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Member invited successfully',
        });
        this.visible = false;
        this.loading = false;
        this.inviteForm.reset();
      }, 1000);
    }
  }

  removeMember(member: Member) {
    this.loading = true;
    setTimeout(() => {
      this.members = this.members.filter((m) => m.id !== member.id);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Member removed successfully',
      });
      this.loading = false;
    }, 1000);
  }

  getRoleClass(role: string): string {
    switch (role.toLowerCase()) {
      case 'developer':
        return 'success';
      case 'product owner':
        return 'warning';
      case 'scrum master':
        return 'info';
      default:
        return 'primary';
    }
  }
}
