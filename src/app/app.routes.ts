import { Routes} from '@angular/router';
import { authCanActivate } from './dashboard/guards/isAuthenticated.guard';
import { isNotAthenticatedGuard } from './dashboard/guards/is-not-athenticated.guard';

export const routes: Routes = [
    {
        path: 'auth',
        //canActivate: [isNotAthenticatedGuard],
        loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    { 
        path: 'dashboard',
        //Guards
        //canActivate: [ authCanActivate ],
        //data: ['hola'],
        loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
     },
    {
        path: '**',
        redirectTo: 'auth',
        pathMatch:'full'
    }
];
