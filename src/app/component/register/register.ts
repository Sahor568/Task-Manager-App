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

  // Form group for register form
  protected registerForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/), // Regex pattern for email validation
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  // Method to handle form submission
  protected onSubmit() {
    const formData = this.registerForm.getRawValue(); // Get form data as a plain object

    if (formData.password !== formData.confirmPassword) {
      // alert("Passwords don't match!");
      this.toastService.showToast('info', 'Alert', "Passwords don't match!"); // Show info toast message
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]'); // [] this is fallback

    if (users.find((u: any) => u.email === formData.email)) {
      this.toastService.showToast('info', 'Alert', 'Email already registered!'); // Show info toast message
      return;
    }

    const nextId = users.length ? Math.max(...users.map((u: any) => u.id)) + 1 : 1; // Generate next user ID based on existing users

    // Create a new user object with the form data and generated ID
    const newUser = {
      id: nextId, //Date.now()
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    users.push(newUser); // Add new user to the users array
    localStorage.setItem('users', JSON.stringify(users)); // Save updated users array to localStorage

    this.toastService.showToast('success', 'Register Status', 'Register successfully!'); // Show success toast message
      this.router.navigate(['/login']);
  }

  // for form validation
  protected get email() {
    return this.registerForm.get('email');
  }

  // for form validation
  protected get password() {
    return this.registerForm.get('password');
  }

  // for form validation
  protected get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  // for form validation
  protected get name() {
    return this.registerForm.get('name');
  }
}
