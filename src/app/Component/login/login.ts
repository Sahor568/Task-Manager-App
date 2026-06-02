import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, ToastModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  providers: [MessageService],
})
export class Login {
  private router = inject(Router);
  private messageService = inject(MessageService);

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    const formData = this.loginForm.getRawValue();

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u: any) => u.email === formData.email && u.password === formData.password,
    );

    if (user) {
      this.showSuccess();

      localStorage.setItem('currentUser', JSON.stringify(user.id));

      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1000);
    } else {
      // alert('Invalid email or password!');
      this.showFailed();
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Login Status',
      detail: 'Login successfully!',
      life: 3000,
    });
  }
  showFailed() {
    this.messageService.add({
      severity: 'error',
      summary: 'Login Status',
      detail: 'Invalid email or password!',
      life: 3000,
    });
  }
}

