import { SlicePipe } from '@angular/common';
import { Component,input,Input, OnInit  } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../core/interface/product';
import { ProductServices } from '../services/product-services.service';
import { CartService } from '../services/cart.service';
import { CartData } from '../core/interface/CartData';
import { CardlenghtService } from '../services/cardlenght.service';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink,SlicePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements OnInit {
constructor(private _CartService: CartService, private router: Router,private _CardlenghtService:CardlenghtService){}

@Input() product!:Product;
userId=null;
ngOnInit(): void {

console.log(this.product);
 const token = localStorage.getItem('token');
const  decoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
 const userId =decoded._id;
this.userId=userId;




}
goToDetails(productId: any) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert("Please login to see product details.");
    this.router.navigate(['/login']);
    return;
  }

  this.router.navigate(['/details', productId]);
}

 isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  addToCart(product: Product) {
    if (!this.isLoggedIn()) {
      alert("Please Login First")
      this.router.navigate(['/login']);
      return;
    }
    const cart:CartData= {
      userId:`${this.userId}`,
      productId:`${product._id}`,
      quantity:1

    }

    this._CartService.addToCart(cart).subscribe({

     next:()=> {alert("Added Succesful");
       this._CardlenghtService.lenght =this._CardlenghtService.lenght+1 ;


     },
     error:(err:any)=>{
      console.log(err);


     }

    });
  }
}
