import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./Component/header/header";
import { Sidebar } from "./Component/sidebar/sidebar";
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

  isLoggedIn() {
    const currentUser = this.authService.getCurrentUserId();
    return !!currentUser;
  }
}
