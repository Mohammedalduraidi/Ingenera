import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './projectManager/landing/landing.component';

const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
