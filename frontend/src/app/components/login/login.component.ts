import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { LoginData } from '../core/interface/LoginData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private _UsersService :UsersService,private router:Router){

  }
  valid:boolean=true;
    loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: LoginData = this.loginForm.value as LoginData;

     this._UsersService.login(loginData).subscribe({
      next:(res)=>{

        this.router.navigate(['/home']);
        localStorage.setItem("token",res.token);


      }
      ,
      error:(err)=>{
        console.log(err);
         this.valid=false;
      }
     })

    } else {
      console.log('Form is invalid');
    }
  }

}
