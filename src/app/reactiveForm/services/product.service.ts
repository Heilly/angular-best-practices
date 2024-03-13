import { Injectable, computed, signal } from '@angular/core';
import { Shipping } from '../interfaces/shipping.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private _shippingSignal = signal<Shipping[]>([
    {
      id: 1,
      metodo: 'Recogida en el local',
      price: 0,
    },
    {
      id: 2,
      metodo: 'Envio a domicilio',
      price: 5,
    },
  ])

  public shippingSignal = computed( () => this._shippingSignal() )
  
  // constructor() {}
}
