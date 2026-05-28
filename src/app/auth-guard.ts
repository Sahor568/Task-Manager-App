import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('currentUser') !== null) {
    return true;
    alert('You loggedIn to this page!');
    window.location.href = '/dashboard';
  }
  else {
    alert('You must be logged in to access this page!');
    window.location.href = '/login';
  }
  return false;
};
