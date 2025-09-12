import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {Token} from '../services/token';


export const onlyLogged: CanActivateFn = (route, state): boolean => {
  const tokenService: Token = inject(Token);
  const router: Router = inject(Router);


  if (tokenService.hasToken()) {
    return true;
  }

  router.navigate(['auth', 'login']);
  return false;
};
