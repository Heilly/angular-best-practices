import { Directive } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Directive({ selector: '[appPassvalidator]' })
export class PassvalidatorDirective {
  constructor() { }
}

export const Passvalidator = (control : AbstractControl) => {
  const password = control.get('password');
  const repitpassword = control.get('repitpassword');

  return password === repitpassword ? true : false
}