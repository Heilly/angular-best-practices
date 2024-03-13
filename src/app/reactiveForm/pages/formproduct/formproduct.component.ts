import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormControl, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { map, pipe, tap } from 'rxjs';
import { ReactiveformserviceService } from '../../services/reactiveformservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formproduct',
  templateUrl: './formproduct.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class FormproductComponent {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private reactiveValitadors = inject( ReactiveformserviceService );

  public shippingSignal = computed( () => this.productService.shippingSignal() );
  public precioEnvio= signal(0);
  public precioTotal = computed( () => {
    const precioEnvioNum = Number(this.precioEnvio());
    const priceNum = Number(this.myForm.get('price')!.value);
    return precioEnvioNum + priceNum - Number(this.isOffer.value);
  } );
  public newCategory = new FormControl('');
  public isOffer = new FormControl(0);
  public myForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required]],
    offer: ['no', [Validators.required]],
    categories: this.fb.array([], Validators.required),
    gifTicket: [false],
    shipping: [ '', Validators.required],});

  

  get categoriesArray() : FormArray{
    return (this.myForm.get('categories') as FormArray);
  }

  ngOnInit() {
    this.onShippingChange()
  }

  onShippingChange(){
    return this.myForm.get('shipping')?.valueChanges
              .pipe(
                map( value => +value! )
              )
              .subscribe(value => {
                if(value === 0){
                   this.precioEnvio.set(0);
                   return;
                  }

                //console.log('value =0 ', this.precioEnvio());
                const precio = this.shippingSignal().at(value-1)!;
                this.precioEnvio.set(precio.price);
                //console.log('value', this.precioEnvio());
              });
  }

  addCategory(){
    if( this.newCategory.value === '' )return;

    this.categoriesArray.push(
      this.fb.control(this.newCategory.value)
    )
    this.newCategory.reset()
  }
  onSubmit() {
    if( this.myForm.invalid || this.newCategory.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }
    Swal.fire({
      icon: "success",
      title: "Guardo",
    });
    this.myForm.reset();
    this.myForm.get('categories')?.setValue([]);
    this.newCategory.reset();
  }

  isValidField( field: string ){
    return this.reactiveValitadors.isValidField( field, this.myForm)
  }

  getFieldError( field:string ){
    return this.reactiveValitadors.getFieldError( field, this.myForm )
  }

}
