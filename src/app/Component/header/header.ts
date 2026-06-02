import { Component, inject } from '@angular/core';
import { authService } from '../../Service/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private authService = inject(authService);

  getUserName(): string {
    const userId = this.authService.getCurrentUser();
    const users: any[] = JSON.parse(localStorage.getItem('users') || '[]'); // Get the list of users from localStorage
    const user = users.find((u: any) => u.id === userId); // Find the user with the matching ID
    return user?.name || 'Guest';
  }
}
