import { computed, inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { AuthStatus } from '../../auth/interfaces';

export const authCanActivate: CanActivateFn = (route, state) => {
  console.log({route, state});
  const authService = inject(AuthService);
  const router = inject(Router);
 
  if( authService.authStatus()=== AuthStatus.authenticated ) return true;
  
    router.navigateByUrl('/auth/login')
    return false;
};



export const authCanMatch: CanMatchFn = (route: Route, segments: UrlSegment[]) : Observable<boolean> | boolean => {
  //console.log({route, segments});
  return true;
}


