import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from '../../interfaces/menuItem.interface';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
})
export class NavbarSharedComponent {

  @Input() menuItem! : MenuItem[];
}
