import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public  getCurrentUserId() {
    return JSON.parse(localStorage.getItem('currentUser')!);
  };
}
