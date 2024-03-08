import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { min } from 'rxjs';
import { ReactiveformserviceService } from '../../services/reactiveformservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class BasicComponent {
  private reactiveFormService = inject( ReactiveformserviceService );

  public fb = inject( FormBuilder );

  public myBasicForm = this.fb.group({
    name: [ '', [Validators.required, Validators.minLength(3)] ],
    price: [ 0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(1)]]
  });

  isValidField( field: string ){
    return this.reactiveFormService.isValidField( field, this.myBasicForm );
  }
  getFieldError( field: string ) {
    return this.reactiveFormService.getFieldError(field, this.myBasicForm);
  }


  onSubmit(){
    if( this.myBasicForm.invalid ){
      Swal.fire({
        icon: "error",
        title: "Error en un campo",
      });
      this.myBasicForm.markAllAsTouched();
      return;
    }
    this.myBasicForm.reset();
  }

}
