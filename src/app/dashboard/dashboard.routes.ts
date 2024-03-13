import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { hasRolesGuard } from './guards/is-roles.guard';


export const DASHBOARD_ROUTES: Routes = [
   { path: '', component: DashboardLayoutComponent,
      children: [
         { path: '', component: HomeComponent},
         { 
            path: 'mapbox',
            canActivate: [hasRolesGuard], 
            loadChildren: () => import('../mapbox/mapbox.routes').then( r => r.MAPBOX_ROUTES),
            data: {
              allowedRoles: [ 'user', 'mapa' ]
            } 
         },
         { 
            path: 'reactiveform', 
            canActivate: [hasRolesGuard], 
            loadChildren: () => import('../reactiveForm/reactiveform.routes').then( r => r.REACTIVEFORM_ROUTES ),
            data: {
               allowedRoles: [ 'admin', 'Formulario' ]
             } 
         },
         { 
            path: 'multiselet', 
            loadChildren:() => import('../multiSelect/multiselect.routes').then( r => r.MULTISELECT_ROUTES ),
            data: {
               allowedRoles: [ 'admin', 'Selectores' ]
             } 
         }
      ] },
   {
      path: '**', redirectTo: ''
   }
];
