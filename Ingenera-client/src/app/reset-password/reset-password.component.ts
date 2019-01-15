import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import axios from 'axios';
import { ToastService } from '../toast.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  restPasswordFrom: FormGroup;
  submitted: Boolean = false;
  constructor(private formBuilder: FormBuilder, ) {

    this.restPasswordFrom = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.restPasswordFrom.controls; }
  Submit() {
    this.submitted = true;
    const { password, confirmPassword } = this.restPasswordFrom.value;
    console.log(password, confirmPassword)
    if (this.restPasswordFrom.invalid) {
      return;
    }
  }
}
