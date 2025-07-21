import { Component, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CardlenghtService } from '../services/cardlenght.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  constructor(private _CardlenghtService :CardlenghtService,private rouuter:Router){

  }
  lenght:number=0
//  isAdmin = false;
ngOnInit(): void {
 const token = localStorage.getItem('token');
const  decoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
 const role =decoded.role;
    // this.isAdmin = role === 'admin';



}
isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}
 isAdmin(): boolean {
  const token = localStorage.getItem('token');
  if (!token) return false;
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded.role === 'admin';
  } catch {
    return false;
  }
}

  token=localStorage.getItem("token");
  logout(){
    localStorage.clear();
      this.rouuter.navigate(['/login']);

  }
}
