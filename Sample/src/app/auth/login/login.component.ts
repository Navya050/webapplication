import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService) {}

  onlogin(form: any) {
    if (form.valid) {
      this.authService.login(form.value.email, form.value.password);
      console.log('Form Submitted:', this.loginData);
    } else {
      console.log('Form is invalid');
    }
  }
}
