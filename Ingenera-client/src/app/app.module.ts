import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


//import allcomponent.ts 
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
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
} from '@angular/material';
import { ToastrModule } from 'ng6-toastr-notifications';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    HomeComponent,
    Terms,
    LandingComponent
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
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatSelectModule
  ],
  entryComponents: [
    Terms
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
