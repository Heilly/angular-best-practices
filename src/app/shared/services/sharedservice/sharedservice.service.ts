import { Injectable, signal } from '@angular/core';
import { MenuItem } from '../../interfaces/menuItem.interface';

@Injectable({providedIn: 'root'})
export class SharedserviceService {
  // constructor() {}

  public menuItemSidebar = signal<MenuItem[]>([
    { name: 'MapBox', router: '/dashboard/mapbox', icon: 'location_on', color: '#C73111', description: 'Ubicar en Mapbox'},
    { name: 'Reactive Form', router: '/dashboard/reactiveform', icon: 'list_alt', color: '#429F19', description: 'Formularios Reactivos'},

    { name: 'Selectores', router: '/dashboard/multiselet', icon: 'person_pin_circle', color: '#186888', description: 'Selectores Anidados'},
    { name: 'House', router: '/maps/propertypage', icon: 'home_pin', color: '#630B75'},
  ]);
}
