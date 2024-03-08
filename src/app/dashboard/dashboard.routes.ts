import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout.component';
import { HomeComponent } from './pages/home/home.component';


export const DASHBOARD_ROUTES: Routes = [
   { path: '', component: DashboardLayoutComponent,
      children: [
         { path: '', component: HomeComponent},
         { path: 'mapbox', loadChildren: () => import('../mapbox/mapbox.routes').then( r => r.MAPBOX_ROUTES) },
         { path: 'reactiveform', loadChildren: () => import('../reactiveForm/reactiveform.routes').then( r => r.REACTIVEFORM_ROUTES )},
         { path: 'multiselet', loadChildren:() => import('../multiSelect/multiselect.routes').then( r => r.MULTISELECT_ROUTES ) }
      ] },
   {
      path: '**', redirectTo: ''
   }
];
