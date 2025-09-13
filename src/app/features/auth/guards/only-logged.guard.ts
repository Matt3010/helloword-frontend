import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {TokenService} from '../services/token.service';


export const onlyLoggedGuard: CanActivateFn = (route, state): boolean => {
  const tokenService: TokenService = inject(TokenService);
  const router: Router = inject(Router);


  if (tokenService.hasToken()) {
    return true;
  }

  router.navigate(['auth', 'login']);
  return false;
};
