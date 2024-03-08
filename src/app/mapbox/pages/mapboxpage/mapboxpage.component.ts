
import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { MapboxserviceService } from '../../services/mapboxservice.service';

(mapboxgl as any).accessToken = 'pk.eyJ1IjoiaGVpbGx5IiwiYSI6ImNsb3d4ejZmcDE2emYya3FlZmN0YmMzOTUifQ.HEF82RwDJnVqy-J5y4X-lA';


@Component({
  selector: 'app-mapboxpage',
  templateUrl: './mapboxpage.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class MapboxpageComponent implements AfterViewInit {  

  public mapService = inject( MapboxserviceService );

  @ViewChild('map') divMap! : ElementRef;

  ngAfterViewInit(): void {

    if( !this.divMap ) throw 'El elemento divMap no está definido.';

    const containerValue = this.divMap.nativeElement;
    this.mapService.createMap({ container: containerValue });
    
  }
}
