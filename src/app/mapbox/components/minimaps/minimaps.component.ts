import { AfterViewInit, Component, ElementRef, Input,  ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Map, Marker } from 'mapbox-gl';
import { MapboxserviceService } from '../../services/mapboxservice.service';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'maps-minimaps',
  templateUrl: './minimaps.component.html',
  standalone: true,
  styles: `
  div { width: 100%;
         height: 150px;
         margin: 0px;
         }`,
  imports: [CommonModule],
})
export class MinimapsComponent implements AfterViewInit{
 
 
  private mapboxService = inject( MapboxserviceService );
  @Input() lngLat?: [number, number];
  @ViewChild('map') divMap? : ElementRef;

  public map? : Map;
  

  ngAfterViewInit(): void {
    if( !this.divMap?.nativeElement ) 'Map div not found'
    if( !this.lngLat ) throw 'LngLat cant be null';
    
    //mapa
    const map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
    new Marker()
      .setLngLat(this.lngLat)
      .addTo(map);

    


    //marker
  }

}
