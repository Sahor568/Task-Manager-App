import { Component, inject } from '@angular/core';
import { AuthService } from '../../common/service/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private authService = inject(AuthService);

  protected getUserName(): string {
    const userId = this.authService.getCurrentUserId();
    const users: any[] = JSON.parse(localStorage.getItem('users') || '[]'); // Get the list of users from localStorage
    const user = users.find((u: any) => u.id === userId); // Find the user with the matching ID
    return user?.name || 'Guest';
  }
}
