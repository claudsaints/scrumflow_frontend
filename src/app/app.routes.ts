import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { SignInComponent } from './pages/signin/sign-in.component';
import { SignUpComponent } from './pages/signup/sign-up.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectConfigComponent } from './pages/project-config/project-config.component';
import { MembersComponent } from './pages/members/members.component';
import { SprintsComponent } from './pages/sprints/sprints.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    {path: "" , component: LandingComponent},
    {path: "signin" , component: SignInComponent},
    {path: "signup" , component: SignUpComponent},
    {path: "home" , component: HomeComponent},
    {path: "profile" , component: ProfileComponent},
    {path: "project/:id/general", component: ProjectComponent},
    {path: "project/:id/config", component: ProjectConfigComponent},
    {path: "project/:id/members", component: MembersComponent},
    {path: "project/:id/sprints", component: SprintsComponent}    
];
