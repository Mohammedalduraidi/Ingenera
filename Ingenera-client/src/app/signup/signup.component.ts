import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastService } from '../toast.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import decode from 'jwt-decode';
let agree = false
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // Variable decelerations.
  registerForm: FormGroup;
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
    private router: Router,
    public toast: ToastService,
    public dialog: MatDialog, ) {


  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  TermsModal() {
    this.submitted = false;
    this.dialog.open(Terms);
    this.dialog.afterOpen.closed
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSelect(e) {
    this.warning = "";
  }
  onSubmit() {
    this.submitted = true;

    const { firstName, lastName, email, password, confirmPassword } = this.registerForm.value;

    if (this.access.length === 0) {
      this.warning = "Please select a type";
      return;
    }

    if (this.registerForm.invalid) {
      return;
    }
    if (agree) {
      if (password === confirmPassword) {
        this.loading = true;
        axios.post('/api/auth/signup', { firstName, lastName, email, password, userType: this.access, acceptTerms: true })
          .then(({ data }) => {
            this.loading = false;
            if (data.status === 409) {
              this.toast.showErorr(data.message)
            } else {
              localStorage.setItem("token", data.token)
              localStorage.setItem("loggedIn", 'true')
              if (data.userType === 'bm') {
                this.router.navigate(['bmHome'])
              } else {
                this.router.navigate(['landing'])
              }
              this.toast.presentToast(data.message)
            }
          }).catch(err => {
            console.log(err)
            this.toast.showErorr('Error Occurred')
          })
      }
      else {
        this.toast.showErorr("Password doesn't match. Please rewrite it again");
      }
    } else {

      this.toast.showErorr("please accept terms and condition");
    }

  }
}


@Component({
  selector: 'terms-Modal',
  templateUrl: 'terms-Modal.html',
})
export class Terms {
  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Terms) { }

  cancel = (): void => {
    this.dialogRef.close();
  }
  Agree() {
    agree = true
    this.dialogRef.close()
  }
}