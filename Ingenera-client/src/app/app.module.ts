import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


//import allcomponent.ts 
import { AppComponent } from './app.component';
import { LoginComponent, ForgetPasswrod } from './login/login.component';
import { SignupComponent, Terms } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { ToastService } from './toast.service';
import { LandingComponent } from './projectManager/landing/landing.component';


import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatDialogModule,
  MatSelectModule,
  MatCardModule
} from '@angular/material';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BmHomeComponent } from './bussinessManager/bm-home/bm-home.component';

import { AuthServiceService } from './security/auth-service.service'
import { RoleGuardService } from './security/role-guard.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    HomeComponent,
    Terms,
    LandingComponent,
    ForgetPasswrod,
    BmHomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    NoopAnimationsModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatSelectModule,
    MatCardModule
  ],
  entryComponents: [
    Terms,
    ForgetPasswrod,
  ],
  providers: [ToastService, AuthServiceService, RoleGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
