import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
})
export class LoginpageComponent {

private authService = inject(AuthService);
private router = inject(Router);

public fb = inject( FormBuilder );

public loginForm = this.fb.group({
  email: ['heilly@google.com' , [Validators.required, Validators.email]],
  password: ['123456', [Validators.required, Validators.minLength(6)]]
});

onLogin(){

  const {email, password} = this.loginForm.value;
  
  if( !email || !password) return;
  

  this.authService.login( email, password )
        .subscribe( {
          next: () => this.router.navigateByUrl('/dashboard'),
          error: (message: string) => {
            Swal.fire('Error', message)
          }
        });
}
}
