import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Data, RouterModule } from '@angular/router';
import { MapboxserviceService } from '../services/mapboxservice.service';
import { NavbarSharedComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'mapbox-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule,
            NavbarSharedComponent],
})
export class LayoutComponent implements OnInit {

  public mapboxService = inject( MapboxserviceService );
  private activatedRoute = inject( ActivatedRoute );
  @Output() dataEmit = new EventEmitter<Data>();

ngOnInit(): void {
      const data = this.activatedRoute.snapshot.data;
      this.dataEmit.emit(data);
  }

}
