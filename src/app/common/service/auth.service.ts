import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Get the currentUserId from local storage
  public  getCurrentUserId() {
    return JSON.parse(localStorage.getItem('currentUserId')!);
  };
}
