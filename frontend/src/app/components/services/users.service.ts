import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginData } from '../core/interface/LoginData';
import { registerData } from '../core/interface/RgisterData';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


   private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(userData: LoginData): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, userData);
  }

  register(userData: registerData): Observable<any> {
    return this.http.post(`${this.baseUrl}/user`, userData);
  }

  logout() {

    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}


