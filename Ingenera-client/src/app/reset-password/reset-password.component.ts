import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import axios from 'axios';
import { ToastService } from '../toast.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  restPasswordFrom: FormGroup;
  submitted: Boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public toast: ToastService) {

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
    if (this.restPasswordFrom.invalid) {
      return;
    }
    let token = this.router.url.split('/')[2]
    let email = this.router.url.split('/')[3]
    if (password === confirmPassword) {
      axios.post('api/auth/reset', { newPass: password, token, email })
        .then(({ data }) => {
          if (data.code === 409) {
            this.toast.showErorr(data.message)
          } else {
            this.toast.presentToast(data.message)
            this.router.navigate(['login']);
          }
        }).catch(err => {
          console.log(err)
          this.toast.showErorr('Error Occurred, please check your internet')
        })
    } else {
      this.toast.showErorr("Password and confirm password dose not match")
    }
  }
}
