import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Footer } from "./footer/footer";
import { Sidebar } from "./sidebar/sidebar";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  isLoggedIn() {
    const currentUserId = localStorage.getItem('currentUser');
    currentUserId !== null;
    return true;
  }
  // isNotLoggedIn() {
  //   const currentUserId = localStorage.getItem('currentUser');
  //   currentUserId === null;
  //   return true;
  // }
}
