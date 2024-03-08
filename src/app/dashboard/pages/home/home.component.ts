import { Component, Input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/cards/card.component';
import { RouterLink } from '@angular/router';
import { MenuItem } from '../../../shared/interfaces/menuItem.interface';
import { SharedserviceService } from '../../../shared/services/sharedservice/sharedservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterLink],
})
export class HomeComponent {


  public sharedService = inject(SharedserviceService);

  public itemMenu = computed( () => this.sharedService.menuItemSidebar() )
}
