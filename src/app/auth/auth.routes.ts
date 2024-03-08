import { Routes } from '@angular/router';
import { AuthlayoutComponent } from './layouts/authlayout.component';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import { RegisterpageComponent } from './pages/registerpage/registerpage.component';


export const AUTH_ROUTES: Routes = [
   { path: '', 
   component: AuthlayoutComponent,
  children: [
    { path : 'login', component: LoginpageComponent },
    { path: 'register', component: RegisterpageComponent},
    { path: '**', redirectTo: 'login' }
  ] },
];
