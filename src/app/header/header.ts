import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  getUserName(): string {
    const userId = Number(localStorage.getItem('currentUser'));
    const users: any[] = JSON.parse(localStorage.getItem('users') || '[]'); // Get the list of users from localStorage
    const user = users.find((u: any) => u.id === userId); // Find the user with the matching ID
    return user?.name || 'Guest';
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  }
}
