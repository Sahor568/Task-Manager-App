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

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  protected onSubmit() {
    const formData = this.loginForm.getRawValue();

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u: any) => u.email === formData.email && u.password === formData.password,
    );

    if (user) {
      this.toastService.showToast('success', 'Login Status', 'Login successfully!');

      localStorage.setItem('currentUser', JSON.stringify(user.id));

      this.router.navigate(['/dashboard']);
    } else {
      // alert('Invalid email or password!');
      this.toastService.showToast('error', 'Login Status', 'Invalid email or password!');
    }
  }

  protected get email() {
    return this.loginForm.get('email');
  }

  protected get password() {
    return this.loginForm.get('password');
  }
}

