import { Injectable, signal } from '@angular/core';
import { MenuItem } from '../../shared/interfaces/menuItem.interface';
import { MapboxMap } from '../interfaces/map. interface';
import { LngLat, Map, Marker } from 'mapbox-gl';
import { Observable } from 'rxjs';
import { MarkerAndColor } from '../interfaces/markerAndColor.interface';
import { PlainMarkers } from '../interfaces/plainMarkers.interface';

@Injectable( {providedIn: 'root'} )
export class MapboxserviceService {

  public markersSignal = signal<MarkerAndColor[]>([]);

  

  public menuMapbox = signal<MenuItem[]>([
      { name: 'MapBox', router: '/dashboard/mapbox', icon: 'location_on', color: '#C73111'},
      { name: 'ZoomRange', router: '/dashboard/mapbox/zoomrange', icon: 'zoom_in', color: '#429F19'},
      { name: 'Markers', router: '/dashboard/mapbox/markers', icon: 'person_pin_circle', color: '#186888'},
      { name: 'House', router: '/dashboard/mapbox/house', icon: 'home_pin', color: '#630B75'},
    ]);

    public map! : Map;


    createMap( mapBox : MapboxMap ) {
    return this.map = new Map({
        container: mapBox.container,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: mapBox.center || [ -3.70, 40.41],
        zoom: mapBox.zoom || 5
      });
    }

    addMarker( lngLat: LngLat, color: string ){
      if( !this.map) return;
    
      const marker = new Marker({ color: color, draggable: true })
                            .setLngLat(lngLat)
                            .addTo(this.map);
    
        this.markersSignal.update( markers => {
          const newMarker: MarkerAndColor = { marker: marker, color: color };
           //markers.push(newMarker);
           //return markers;
          return [...markers, newMarker];
        });
        this.saveToLocalStorage();
        
        marker.on('dragend', () => {
          this.saveToLocalStorage();
         });
      }

      saveToLocalStorage(){
        const plainMarkers: PlainMarkers[] = this.markersSignal().map( marker => {
          return {
            color : marker.color,
            lngLat: marker.marker.getLngLat().toArray(),
          }; });
        console.log(plainMarkers);
        localStorage.setItem('markersLngLat', JSON.stringify(plainMarkers));
      }
      
}
