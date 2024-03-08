import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LngLat, Map } from 'mapbox-gl';
import { MapboxserviceService } from '../../services/mapboxservice.service';

@Component({
  selector: 'app-zoomrangepage',
  templateUrl: './zoomrangepage.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ZoomrangepageComponent implements AfterViewInit, OnDestroy {

  private mapService = inject( MapboxserviceService );

  public zoom = signal<number>(9);
  public lngLat? : LngLat = new LngLat( 2.11, 41.34);
  
  @ViewChild('map') divMap! : ElementRef;
  public map! : Map;


  ngAfterViewInit(): void {

    if( !this.divMap ) throw 'El elemento divMap no está definido.';

    const containerValue = this.divMap.nativeElement;

    this.map = this.mapService.createMap({ container: containerValue, zoom: 8});
    
    this.mapListener();
  }
  ngOnDestroy(): void {
    this.map?.remove();
  }

  //listener, para saber cuando cambia el zoom
  mapListener() {
    if( !this.map ) throw 'El mapa no existe 1';
    this.map.on('zoom', (ev) => {
      this.zoom.set(this.map!.getZoom());
    } );

    if( !this.map ) throw 'EL mapa no existe 2';
    this.map.on('zoomend', (ev) => {
      if(this.map!.getZoom() < 18 ) return;
      this.map?.zoomTo(18);
      this.zoom.set(this.map!.getZoom());
    } );

    this.map.on('move', (ev) => {
      this.lngLat = this.map?.getCenter();
      const { lng, lat } = this.lngLat!

      
    })
  }


  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChanged( value: string){
    this.zoom.set( Number(value) );
    this.map?.zoomTo(Number(value));
  }
}
