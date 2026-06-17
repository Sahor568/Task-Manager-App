import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../common/service/toast.service';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, ToastModule, FloatLabel, InputText],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  private router = inject(Router);
  private toastService = inject(ToastService);

  // Form group for login form
  protected loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/), // Regex pattern for email validation
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  // Method to handle form submission
  protected onSubmit() {
    const formData = this.loginForm.getRawValue();

    const users = JSON.parse(localStorage.getItem('users') || '[]'); 
    const user = users.find(
      (u: any) => u.email === formData.email && u.password === formData.password,
    );

    if (user) {
      this.toastService.showToast('success', 'Login Status', 'Login successfully!'); // Show success toast message

      localStorage.setItem('currentUserId', JSON.stringify(user.id)); // Store the current user's ID in local storage

      this.router.navigate(['/dashboard']);
    } else {
      this.toastService.showToast('error', 'Login Status', 'Invalid email or password!'); // Show error toast message
    }
  }

  // for form validation
  protected get email() {
    return this.loginForm.get('email');
  }

  // for form validation
  protected get password() {
    return this.loginForm.get('password');
  }
}

