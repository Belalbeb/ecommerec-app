import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductServices } from '../services/product-services.service';
import { Router, RouterModule } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create-product',
  standalone: true,
imports: [FormsModule, RouterModule, ReactiveFormsModule],

  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
 productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductServices,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      description: [''],
      category: [''],
      image: [''],
      rate: [0],
      count: [0]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;

      const product = {
        title: formValue.title,
        price: formValue.price,
        description: formValue.description,
        category: formValue.category,
        image: formValue.image,
        rating: {
          rate: formValue.rate,
          count: formValue.count
        }
      };

      this.productService.addProduct(product).subscribe({
        next: () => {
          alert('Product added successfully!');
          this.router.navigate(['/products']);
        },
        error: err => console.error(err)
      });
    }
  }
}
