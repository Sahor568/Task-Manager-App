import { CanActivateFn } from '@angular/router';

// This guard checks if the user is already logged in by looking for 'currentUserId' in local storage.
export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('currentUserId') === null) {
    // console.log('You must be logged in to access this page!');
    window.location.href = '/login';
    return false;
  }
  else {
    return true;
  }
};

// This guard checks if the user is already logged in and prevents access to the login page if they are.
export const logGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('currentUserId') !== null) {
    // console.log('You are already logged in to access this page!');
    window.location.href = '/dashboard';
    return false;
  } else {
    return true;
  }
}

