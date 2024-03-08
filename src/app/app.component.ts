import { Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'authApp17';

  private authService = inject(AuthService);
  private router = inject(Router);

  /*public finishedAuthCheck = computed<boolean>( () => {
    console.log(this.authService.authStatus() )
    if ( this.authService.authStatus() === AuthStatus.cheking ) {
      return false;
    }

    return true;
  });*/

  //Variable para determinar si esta autenticado o no
  public authStatusChangedEffect = effect(() => {

    switch( this.authService.authStatus() ) {

      case AuthStatus.cheking:
        return;

      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return;

      case AuthStatus.notauthenticated:
        this.router.navigateByUrl('/auth/login');
        return;

    } });

}
