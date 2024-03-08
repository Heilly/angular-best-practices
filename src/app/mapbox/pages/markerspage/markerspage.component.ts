import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LngLat, Map, Marker } from 'mapbox-gl';
import { PlainMarkers } from '../../interfaces/plainMarkers.interface';
import { MarkerAndColor } from '../../interfaces/markerAndColor.interface';
import { MapboxserviceService } from '../../services/mapboxservice.service';

@Component({
  selector: 'app-markerspage',
  templateUrl: './markerspage.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class MarkerspageComponent {
  
  private mapboxService = inject( MapboxserviceService );

  @ViewChild('map') divMap? : ElementRef;

  public markers: MarkerAndColor[] = [];

  
  public map? : Map;
  public currentLngLat? : LngLat = new LngLat(-3.31, 40.66);

  ngAfterViewInit(): void {
    if(  !this.divMap ) throw 'No existe el mapa';
    this.map = this.mapboxService.createMap( { 
      container: this.divMap.nativeElement,
      center: this.currentLngLat,
      zoom: 7 } );

  this.readFromLocalStorage();
}


createMarket(){  
  if ( !this.map ) throw 'no existe mapa';

  const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
  const lngLat = this.map!.getCenter();


  this.addMarker( lngLat, color);
}

addMarker( lngLat: LngLat, color: string ){
  if( !this.map) return;

  const marker = new Marker({
    color: color,
    draggable: true
  })
    .setLngLat(lngLat)
    .addTo(this.map);

    this.markers.push({
                    marker: marker, 
                    color: color
                  });
 this.saveToLocalStorage();

 marker.on('dragend', () => {
  this.saveToLocalStorage();
 })


}
deleteMarker( index : number ){
  
  this.markers[index].marker.remove();
  this.markers.splice(index, 1);
}
flyTo( marker: Marker ){
  this.map?.flyTo({
    zoom: 14,
    center: marker.getLngLat()
  })
  this.saveToLocalStorage();
}
saveToLocalStorage(){
  const plainMarkers: PlainMarkers[] = this.markers.map((colorMarker) => {
    return {
      color: colorMarker.color,
      lngLat: colorMarker.marker.getLngLat().toArray()
    }
  });
  console.log(plainMarkers);
  localStorage.setItem('markersLngLat', JSON.stringify(plainMarkers))

}
readFromLocalStorage(){
  const plainMarkersString = localStorage.getItem('markersLngLat') ?? '[]';
  const plainMarker: PlainMarkers[] = JSON.parse(plainMarkersString);
  
  plainMarker.forEach(marker => {
  const [ lng, lat ] = marker.lngLat;
  const coords = new LngLat( lng, lat )

    this.addMarker( coords, marker.color);
  } )
  
}

}
