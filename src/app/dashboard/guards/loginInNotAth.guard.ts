import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { AuthStatus } from '../../auth/interfaces';

export const isNotAthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if( authService.authStatus() === AuthStatus.authenticated) {
    router.navigateByUrl('/dashboard')
    return false;}
  
  return true;
};
