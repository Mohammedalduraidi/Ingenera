import { ToastService } from './../toast.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Variable decelerations.
  loginForm: FormGroup;
  loading: Boolean = false;
  submitted: Boolean = false;
  acctypes = [
    { value: 'bm', viewValue: 'Business Maneger' },
    { value: 'pm', viewValue: 'Project Manager' }
  ]
  access: String = ''
  loadingImage: String = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
  warning: String = '';

  constructor(
    private formBuilder: FormBuilder,
    public toast: ToastService,
    public dialog: MatDialog, ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSelect(e) {
    this.warning = "";
  }

  openForgetPassModal() {
    this.dialog.open(ForgetPasswrod);
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.submitted = true;
    if (this.access.length === 0) {
      this.warning = "Please select a type";
      return;
    }
    if (this.loginForm.invalid) {
      return;
    }
    axios.post('api/auth/login', { email, password, userType: this.access })
      .then(({ data }) => {
        if (data.err.code === 404) {
          this.toast.showErorr(data.message)
        } else {
          this.toast.presentToast(data.message)
          //* i should save his token in the local staorge!
          //* i should navigate him to the home page!
        }
      })
      .catch(err => {
        console.log(err)
        this.toast.showErorr('Error Occurred')
      })
  }
}


@Component({
  selector: 'forgetPassword-Modal',
  templateUrl: 'forgetPassword-Modal.html',
})
export class ForgetPasswrod {
  emailForm: FormGroup;
  loading: Boolean = false;
  submitted: Boolean = false;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ForgetPasswrod,
    private router: Router,
    public toast: ToastService,
    private formBuilder: FormBuilder, ) {

    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.emailForm.controls; }

  cancel = (): void => {
    this.dialogRef.close();
  }
  Submit() {
    this.submitted = true;

    if (this.emailForm.invalid) {
      return;
    }

  }
}