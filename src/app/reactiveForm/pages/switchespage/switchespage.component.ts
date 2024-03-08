import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReactiveformserviceService } from '../../services/reactiveformservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-switchespage',
  templateUrl: './switchespage.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class SwitchespageComponent implements OnInit{

  private fb = inject(FormBuilder);
  private reactiveFormService = inject(ReactiveformserviceService)

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required ],
    wantNotifications: [ true, Validators.required ],
    termsAndConditions: [ false, Validators.requiredTrue ],
  });

  public person = {
    gender: 'F',
    wantNotifications: false,
  }
  ngOnInit(): void {
      this.myForm.reset( this.person );
  }

  isValidField( field: string ){
    return this.reactiveFormService.isValidField(field, this.myForm);
  }

  isValidFieldInArray(formArray: FormArray, index : number ){
    return this.reactiveFormService.isValidFieldInArray( formArray, index)
  }

  getFieldError(field: string ){
    return this.reactiveFormService.getFieldError( field, this.myForm );
  }
  onSave(){

    if( this.myForm.invalid ){
        Swal.fire({
          icon: "error",
          title: "Error",
        });
        this.myForm.markAllAsTouched();
        return;
    }

    const { termsAndConditions, ...newPerson } = this.myForm.value;

    this.person = newPerson;
    this.myForm.reset( this.person );

  }
}
