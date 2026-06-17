import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./component/header/header";
import { Sidebar } from "./component/sidebar/sidebar";
import { AuthService} from './common/service/auth.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidebar, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  view = signal('');
  private authService = inject(AuthService);

  // Check if the user is available or not
  isLoggedIn() {
    const currentUser = this.authService.getCurrentUserId();
    return !!currentUser;
  }
}
