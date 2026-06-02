import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class authService {
  public  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  };
}
