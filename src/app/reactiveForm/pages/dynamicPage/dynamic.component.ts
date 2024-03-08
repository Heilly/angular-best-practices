import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReactiveformserviceService } from '../../services/reactiveformservice.service';
import { config } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class DynamicComponent {
  private fb = inject( FormBuilder );
  private reactiveFormService = inject( ReactiveformserviceService );

  public myDynamicForm = this.fb.group({
    name: [ '', [Validators.required, Validators.minLength(3)] ],
    favorites: this.fb.array([])
  });

  public newFavorite = this.fb.control( '', [ Validators.required ] );
  
  get favoriteCountry(){
    return (this.myDynamicForm.get('favorites') as FormArray);
  }

  onSubmit(){

    if(this.myDynamicForm.invalid) {
      Swal.fire({
        icon: "error",
        title: "Error",
      });
      this.myDynamicForm.markAllAsTouched();
      this.newFavorite.markAllAsTouched();
      return;
    }
    this.myDynamicForm.reset();
    this.newFavorite.reset();
    this.myDynamicForm.controls['favorites'] = this.fb.array([])
  }

  isValidField( field: string ){
    return this.reactiveFormService.isValidField(field, this.myDynamicForm);
  }

  isValidFieldInArray(formArray: FormArray, index : number ){
    return this.reactiveFormService.isValidFieldInArray( formArray, index)
  }

  getFieldError(field: string ){
    return this.reactiveFormService.getFieldError( field, this.myDynamicForm );
  }
  onAddFavorite(){
    if(this.newFavorite.invalid) return;
    this.favoriteCountry.push(
      this.fb.control( this.newFavorite.value ));

    this.newFavorite.reset();
    console.log(this.myDynamicForm.value);
  }

  onDeleteFavorite(  index : number){
    this.favoriteCountry.removeAt(index);
    //console.log(this.myDynamicForm.get('favorites')?.value);
  }

}
