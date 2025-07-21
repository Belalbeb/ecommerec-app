import { Component, OnInit } from '@angular/core';
import { ProductServices } from '../services/product-services.service';
import { Product } from '../core/interface/product';
import { ProductComponent } from "../product/product.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products:Product[]=[]


  constructor(private _ProductServices: ProductServices){

  }

ngOnInit(): void {
  this._ProductServices.getProducts().subscribe({
    next:(res)=>{
      this.products=res.products;
      


    }
    ,
    error:(error)=>{
      console.log(error);


    }

  })
}
}
