import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('currentUser') === null) {
    // alert('You must be logged in to access this page!');
    window.location.href = '/login';
    return false;
  }
  else {
    return true;
  }


};
export const logGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('currentUser') !== null) {
    // alert('You are already logged in to access this page!');
    window.location.href = '/dashboard';
    return false;
  } else {
    return true;
  }
}

