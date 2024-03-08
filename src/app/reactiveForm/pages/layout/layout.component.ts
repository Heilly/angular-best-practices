import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarSharedComponent } from '../../../shared/components/navbar/navbar.component';
import { ReactiveformserviceService } from '../../services/reactiveformservice.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarSharedComponent],
})
export class LayoutComponent {

  public reactiveFormService = inject( ReactiveformserviceService );

}
