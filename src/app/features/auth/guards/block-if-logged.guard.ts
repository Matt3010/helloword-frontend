import {CanActivateFn, Router} from '@angular/router';
import {TokenService} from '../services/token.service';
import {inject} from '@angular/core';

export const blockIfLoggedGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.hasToken()) router.navigate(['global']);
  return !tokenService.hasToken();
};
