import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { ToastService } from '../toast.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
let agree = false
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  acctypes = [
    { value: 'bm', viewValue: 'Business Maneger' },
    { value: 'pm', viewValue: 'Project Manager' }
  ]
  access = ''
  loadingImage = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
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
    });

  }

  TermsModal() {
    this.dialog.open(Terms);
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSelect(e) {
    this.warning = "";
  }
  onSubmit() {
    const { firstName, lastName, email, password } = this.registerForm.value;
    this.submitted = true;
    if (this.access.length === 0) {
      this.warning = "Please select a type";
      return;
    }
    if (this.registerForm.invalid) {
      return;
    }
    if (agree) {
      axios.post('/api/auth/signup', { firstName, lastName, email, password, userType: this.access, acceptTerms: true })
        .then(({ data }) => {
          this.toast.presentToast(data.message)
        }).catch(err => {
          console.log(err)
        })
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
    @Inject(MAT_DIALOG_DATA) public data: Terms,
    private router: Router) { }

  cancel = (): void => {
    this.dialogRef.close();
  }
  Agree() {
    agree = true
    this.dialogRef.close()
  }
}