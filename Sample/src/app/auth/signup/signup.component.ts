import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupData = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService) {}

  onSignUp(form: any) {
    if (form.valid) {
      this.authService.createUser(form.value.email, form.value.password);
      console.log('Signup Form Data:', this.signupData);
    } else {
      console.log('Signup Form is invalid');
    }
  }
}
