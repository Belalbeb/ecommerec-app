import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from './PasswordValid';
import { UsersService } from '../services/users.service';
import { LoginData } from '../core/interface/LoginData';
import { registerData } from '../core/interface/RgisterData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private _UsersService:UsersService,private router:Router){

  }
   registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: passwordMatchValidator });

  onRegister() {
    if (this.registerForm.valid) {

            const register:registerData = this.registerForm.value as  registerData;
       this._UsersService.register(register).subscribe({
        next:(res)=>{
          console.log(res);

          this.router.navigate(['/login']);


        }
        ,
        error:(err)=>{
          console.log(err)
        }
       })
    } else {
      console.log('Form is invalid');
    }
  }
}
