import { Injectable, inject, signal } from '@angular/core';
import { MenuItem } from '../../interfaces/menuItem.interface';
import { Router } from '@angular/router';
import { Roles } from '../../../auth/interfaces';

@Injectable({providedIn: 'root'})
export class SharedserviceService {
  
  private router = inject(Router);
  private menuItem = signal<MenuItem[]>([])

  public menuItemSidebar = signal<MenuItem[]>([
    { name: 'MapBox', router: '/dashboard/mapbox', icon: 'location_on', color: '#C73111', description: 'Ubicar en Mapbox', roles: [ 'admin', 'Mag' ]},
    { name: 'Reactive Form', router: '/dashboard/reactiveform', icon: 'list_alt', color: '#429F19', description: 'Formularios Reactivos', roles: [ 'admin', 'Magg' ]},

    { name: 'Selectores', router: '/dashboard/multiselet', icon: 'person_pin_circle', color: '#186888', description: 'Selectores Anidados'},
    { name: 'House', router: '/maps/propertypage', icon: 'home_pin', color: '#630B75'},
  ]);


}
