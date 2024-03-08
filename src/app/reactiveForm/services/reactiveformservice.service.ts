import { Injectable, signal } from '@angular/core';
import { MenuItem } from '../../shared/interfaces/menuItem.interface';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable( {providedIn:'root'} )
export class ReactiveformserviceService {

  public menuMapbox = signal<MenuItem[]>([
    { name: 'Basic Form', router: '/dashboard/reactiveform/basic', icon: 'location_on', color: '#C73111'},
    { name: 'Dynamic Form', router: '/dashboard/reactiveform/dynamic', icon: 'zoom_in', color: '#429F19'},
    { name: 'Switches Form', router: '/dashboard/reactiveform/switches', icon: 'person_pin_circle', color: '#186888'},
  ]);

isValidField( field: string, myForm?: FormGroup ){
  return myForm?.controls[field].errors &&
          myForm?.controls[field].touched
}
isValidFieldInArray(formArray : FormArray, i: number) : boolean | null{
  return formArray.controls[i].errors 
  && formArray.controls[i].touched;
}
getFieldError( field : string, myBasicForm: FormGroup ) : string | null{
  if( !myBasicForm.controls[field] ) return null;

  const errors = myBasicForm.controls[field].errors || {};

  for ( const key of Object.keys(errors) ){
    switch ( key ){
      case 'required' :
        return 'Campo requerido';
      case 'minlength':
        return `Minimo ${errors['minlength'].requiredLength } caracteres.`;
      case 'noStrider':
        return `El username no puede ser Strider`;
      case 'pattern':
        return 'Se neceita un correo valido';
      case 'min':
        return 'No cumple con el minimo requerido'
    }
  }
  return null;
}
}
