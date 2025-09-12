import {CanActivateFn, Router} from '@angular/router';
import {Token} from '../services/token';
import {inject} from '@angular/core';

export const blockIfLogged: CanActivateFn = () => {
  const tokenService = inject(Token);
  const router = inject(Router);

  if (tokenService.hasToken()) router.navigate(['guess', 'global']);
  return !tokenService.hasToken();
};
