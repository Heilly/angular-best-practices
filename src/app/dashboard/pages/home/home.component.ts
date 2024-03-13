import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/cards/card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MenuItem } from '../../../shared/interfaces/menuItem.interface';
import { SharedserviceService } from '../../../shared/services/sharedservice/sharedservice.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterLink],
})
export class HomeComponent {
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);


  public sharedService = inject(SharedserviceService);

  public itemMenu = computed( () => this.sharedService.menuItemSidebar() );

  userRolesIn( allowedRoles: string[] ){
    const user = this.authService.currentUser();

    if(!user) return;
    const hasRoles : boolean = allowedRoles.some( rol => user.roles.includes(rol) );

    return hasRoles;
  }

  
}
