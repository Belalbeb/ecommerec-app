import { Component, OnInit } from '@angular/core';
import { Product } from '../core/interface/product';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductServices } from '../services/product-services.service';
import { CartService } from '../services/cart.service';
import { CartData } from '../core/interface/CartData';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductServices,
    private router: Router,
    private _CartService: CartService
  ) {}
isAdmin=false;
  ngOnInit(): void {
     const token = localStorage.getItem('token');
const  decoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
 const role =decoded.role;
    this.isAdmin = role === 'admin';
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (data) => {
          this.product = data.product;
          console.log(data);
        },
        error: (err) => console.error(err)
      });
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  addtocart() {
    console.log("inside card");

    if (!this.isLoggedIn()) {
      alert("Please Login First");
      this.router.navigate(['/login']);
      return;
    }

    const token = localStorage.getItem('token');
    const decoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const userId = decoded._id;

    if (!userId || !this.product?._id) {
      console.error("Missing userId or productId");
      return;
    }

    const cart:CartData = {
      userId: userId,

      productId: `${this.product._id}`,
      quantity: 1
    };

    this._CartService.addToCart(cart).subscribe({
      next: () => alert("Added Successfully"),
      error: (err) => console.log(err)
    });
  }
  deleteproduct(id:any){
    this.productService.deleteProduct(id).subscribe({
    next: () => {
    alert("Product deleted successfully");

    },
    error: (err) => {
      console.error("Error deleting product", err);
    }
  });


  }
}

