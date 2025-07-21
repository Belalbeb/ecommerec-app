import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServices {


    private baseUrl = 'http://localhost:3000/product';

  constructor(private http: HttpClient) {}


  getProducts(): Observable<any> {

    return this.http.get(this.baseUrl);
  }

  addProduct(product: any): Observable<any> {
        const token = localStorage.getItem('token') || '';
        const headers = new HttpHeaders({
          token: token
        });
    return this.http.post(this.baseUrl, product,{headers});
  }


  updateProduct(id: string, product: any): Observable<any> {
        const token = localStorage.getItem('token') || '';
        const headers = new HttpHeaders({
          token: token
        });
    return this.http.put(`${this.baseUrl}/${id}`, product,{headers});
  }


  deleteProduct(id: string): Observable<any> {
        const token = localStorage.getItem('token') || '';
        const headers = new HttpHeaders({
          token: token
        });
    return this.http.delete(`${this.baseUrl}/${id}`,{headers});
  }


  getProductById(id: string): Observable<any> {
            const token = localStorage.getItem('token') || '';
        const headers = new HttpHeaders({
          token: token
        });
    return this.http.get(`${this.baseUrl}/${id}`,{headers});
  }
}
