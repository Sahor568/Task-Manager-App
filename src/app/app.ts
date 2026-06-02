import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./Component/header/header";
import { Sidebar } from "./Component/sidebar/sidebar";
import { authService} from './Service/auth.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

  view = signal('');
  private authService = inject(authService);

  isLoggedIn() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      return true;
    } else {
      return false;
    }
  }
}
