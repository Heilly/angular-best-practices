import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { SidemenuComponent } from '../../shared/components/sidemenu/sidemenu.component';
import { CardComponent } from '../../shared/components/cards/card.component';
import { MenuItem } from '../../shared/interfaces/menuItem.interface';
import { SharedserviceService } from '../../shared/services/sharedservice/sharedservice.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, 
            SidemenuComponent, CardComponent],
})
export class DashboardLayoutComponent {

  public authService   = inject(AuthService);

  public user = computed( () => this.authService.currentUser() );

  constructor(){
    console.log(this.user());
    this.authService.checkAuthStatus().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  
}
