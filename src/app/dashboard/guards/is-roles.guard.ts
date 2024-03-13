import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { Roles } from '../../auth/interfaces';

export const hasRolesGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const allowedRoles : string[] = route.data?.['allowedRoles'];
  //console.log( 'allowedRoles', allowedRoles);
  
  const userRoles: string[] = authService.currentUser()!.roles;
  //console.log(userRoles);

  const hasRoles = Boolean(userRoles.every( rol => allowedRoles.includes(rol) ));
  if(hasRoles) return true
  
  alert('Acceso denegado');
  return false
};