import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { SignInComponent } from './pages/signin/sign-in.component';
import { SignUpComponent } from './pages/signup/sign-up.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {path: "" , component: LandingComponent},
    {path: "signin" , component: SignInComponent},
    {path: "signup" , component: SignUpComponent},
    {path: "home" , component: HomeComponent},

    
];
