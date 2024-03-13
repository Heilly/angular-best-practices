import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserRegister } from '../../interfaces/register.interface';
import Swal from 'sweetalert2';
import { ValidatorserviceService } from '../../services/validatorservice.service';
import { Passvalidator } from '../../validators/passvalidator/passvalidator.directive';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class RegisterpageComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthService );
  private router = inject( Router );
  private validatorService = inject( ValidatorserviceService );

  public formRegister = this.fb.group({
    name: [ 'new Heilly', [ Validators.required, 
                           Validators.minLength(3), 
                           Validators.pattern(this.validatorService.firstNameAndLastnamePattern) ] ],
    email: [ 'newheilly@gmail.com', [Validators.required, Validators.pattern(this.validatorService.emailPattern)] ],
    password: [ '123456', [Validators.required, Validators.minLength(6)] ],
    repitpassword: [ '123456', [ Validators.required, Validators.minLength(6), Passvalidator ] ]
  })

  onSubmit(){
    console.log( this.formRegister.value );
    if(this.formRegister.valid) {

    const {repitpassword, ...newUser} = this.formRegister.value;

    const user : UserRegister = {
      email: newUser.email!,
      name: newUser.name!,
      password: newUser.password!
    }
    this.authService.register( user )
    .subscribe((isRegister => {
      if( isRegister === false ) {
        Swal.fire('Error', `El usuario ${user.email} ya existe`)
        return;
      }
      this.router.navigateByUrl('/dashboard')
    })

     )
  }
    
  }
}
