import { authCanActivate, authCanMatch } from './dashboard/guards/dashboardIsAuth.guard';
import { Routes} from '@angular/router';
import { isNotAthenticatedGuard } from './dashboard/guards/loginInNotAth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        canActivate: [isNotAthenticatedGuard],
        loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    { 
        path: 'dashboard',
        //Guards
        canMatch: [authCanMatch],
        canActivate: [ authCanActivate ],
        data: ['hola'],
        loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
     },
    {
        path: '**',
        redirectTo: 'auth',
        pathMatch:'full'
    }
];
