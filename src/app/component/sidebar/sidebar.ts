import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  // Logout the current user and redirect to the login page
  protected onLogout() {
    localStorage.removeItem('currentUserId');
    window.location.href = '/login';
  }
}
