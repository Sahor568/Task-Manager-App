import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../common/service/toast.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private router = inject(Router);
  private toastService = inject(ToastService);

  registerForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  onSubmit() {
    // if (this.registerForm.valid) {
    //   alert(JSON.stringify(this.registerForm.value));
    //   console.log(this.registerForm.value);
    // }

    // const users = JSON.parse(localStorage.getItem('users') || '[]');
    // users.push(this.registerForm.value);
    // localStorage.setItem('users', JSON.stringify(users));

    // if (this.registerForm.invalid) {
    //   alert('Please fill in all required fields with valid data!');
    //   return;
    // }

    const formData = this.registerForm.getRawValue(); // Get form data as a plain object

    if (formData.password !== formData.confirmPassword) {
      // alert("Passwords don't match!");
      this.toastService.showToast('info', 'Alert', "Passwords don't match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]'); //[] this is fallback

    if (users.find((u: any) => u.email === formData.email)) {
      // alert('Email already registered!');
      this.toastService.showToast('info', 'Alert', 'Email already registered!');
      return;
    }
    // let app= users.map((u: any) => u.email === formData.email);
    // if(app){
    //   alert('Email already registered!');
    //   return;
    // }

    const nextId = users.length ? Math.max(...users.map((u: any) => u.id)) + 1 : 1;

    const newUser = {
      id: nextId, //Date.now()
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    this.toastService.showToast('success', 'Register Status', 'Register successfully!');
      this.router.navigate(['/login']);
  }
  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get name() {
    return this.registerForm.get('name');
  }
}
