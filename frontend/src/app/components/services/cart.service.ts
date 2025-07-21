import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartData } from '../core/interface/CartData';

@Injectable({
  providedIn: 'root'
})
export class CartService {





  private apiUrl = 'http://localhost:3000/cart'; // change port if needed


  constructor(private http: HttpClient) {}

  // Add product to cart
  addToCart(data: CartData): Observable<any> {
        const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      token: token
    });
    return this.http.post(`${this.apiUrl}/add`, data,{headers});
  }

  // Update cart item
  updateCartItem(data: { userId: string, productId: string, quantity: number }): Observable<any> {
            const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      token: token
    });
    return this.http.put(`${this.apiUrl}/update`, data,{headers});
  }

  // Remove product from cart
  removeFromCart(data: { userId: string, productId: string }): Observable<any> {
            const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      token: token
    });

  return this.http.delete(`${this.apiUrl}/remove`, {
    headers,
    body: data
  });
}
  

  // Get user cart
  getCart(userId: string): Observable<any> {
            const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      token: token
    });
    return this.http.get(`${this.apiUrl}/${userId}`,{headers});
  }

  // Clear cart
  clearCart(userId: string): Observable<any> {
            const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      token: token
    });
    return this.http.put(`${this.apiUrl}/clear`, { userId },{headers});
  }
}
