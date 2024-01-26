import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppConstants } from 'src/app-constants';

export const authGuard: CanActivateFn = (route, state) => {
  let _path = route.routeConfig?.path;
  let _router = inject(Router);
  let token = localStorage.getItem(AppConstants.BRM_TOKEN);
  // if (token) {
  //   console.log('token', token);
  //   if (_path === 'login') {
  //     _router.navigate(['/dashboard']);
  //   }
  //   return true;
  // }
  // _router.navigate(['login']);

  if (_path === 'login') {
    if (token) {
      _router.navigate(['/dashboard']);
      return false;
    } else return true;
  }
  if (!token) {
    _router.navigate(['/login']);
    return false;
  }
  return true;
};
