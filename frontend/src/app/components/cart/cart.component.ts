import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

import { Router } from '@angular/router';
import { CartItem } from '../core/interface/Cartitem';
import { Cart } from '../core/interface/Card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardlenghtService } from '../services/cardlenght.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone:true,
  imports:[ReactiveFormsModule,FormsModule],
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private router: Router,private _CardlenghtService: CardlenghtService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please Login First");
      this.router.navigate(['/login']);
      return;
    }

    const decoded = JSON.parse(atob(token.split('.')[1]));
    const userId = decoded._id;

    this.cartService.getCart(userId).subscribe({
      next: (res) => {
        this.cartItems = res.cart.products;

        console.log(this._CardlenghtService.lenght)
        this.calculateTotal();
      },
      error: (err) => console.log(err)
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((acc, item) => {
      return acc + item.productId.price * item.quantity;
    }, 0);
  }

  updateItemQuantity(productId: string, quantity: number) {
  const token = localStorage.getItem('token');
  if (!token) return;

  const decoded = JSON.parse(atob(token.split('.')[1]));
  const userId = decoded._id;

  const data = { userId, productId, quantity };

  this.cartService.updateCartItem(data).subscribe({
    next: () => {
      const item = this.cartItems.find(i => i.productId._id === productId);
      if (item) item.quantity = quantity;
      this.calculateTotal();
      alert("updated successfuly");
    },
    error: (err) => console.log(err)
  });
}

removeItem(productId: string) {
  const token = localStorage.getItem('token');
  if (!token) return;

  const decoded = JSON.parse(atob(token.split('.')[1]));
  const userId = decoded._id;

  const data = { userId, productId };

  this.cartService.removeFromCart(data).subscribe({
    next: () => {
      this.cartItems = this.cartItems.filter(item => item.productId._id !== productId);
      this.calculateTotal();
    },
    error: (err) => console.log(err)
  });
}


}
