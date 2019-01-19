
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './projectManager/landing/landing.component';
import { BmHomeComponent } from './bussinessManager/bm-home/bm-home.component';


import { RoleGuardService } from './security/role-guard.service'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'reset/:token/:email', component: ResetPasswordComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'bmHome',
    component: BmHomeComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 'bm'
    }
  },
  {
    path: 'landing',
    component: LandingComponent,
    canActivate: [RoleGuardService],
    data: {
      expectedRole: 'pm'
    }
  },
  { path: '**', redirectTo: '' }


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
