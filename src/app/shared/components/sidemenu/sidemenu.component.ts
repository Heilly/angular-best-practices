import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { MenuItem } from '../../interfaces/menuItem.interface';
import { SharedserviceService } from '../../services/sharedservice/sharedservice.service';


@Component({
  selector: 'shared-sidemenu',
  templateUrl: './sidemenu.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class SidemenuComponent {
  

  public authService   = inject( AuthService );
  public sharedService = inject( SharedserviceService )

  @Input()  public userName: string | undefined = '';

  

}
