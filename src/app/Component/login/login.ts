import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  router = inject(Router);

  loginForm= new FormGroup({
      email: new FormControl('',[Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
  })


  onSubmit() {
    const formData = this.loginForm.getRawValue();

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === formData.email && u.password === formData.password);

    if (user) {
      alert('Login successful!');
      console.log('Logged in user:', user);


      // const currentUser = JSON.stringify(user.id);
      // localStorage.setItem('currentUser', JSON.stringify(currentUser));

      // localStorage.setItem('currentUserId', String(user.id));

      localStorage.setItem('currentUser', JSON.stringify(user.id));


      this.router.navigate(['/dashboard']);


    } else {
      alert('Invalid email or password!');
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}

