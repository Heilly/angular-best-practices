import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MapboxserviceService } from '../services/mapboxservice.service';
import { NavbarSharedComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'mapbox-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule,
            NavbarSharedComponent],
})
export class LayoutComponent {

  public mapboxService = inject( MapboxserviceService );

}
