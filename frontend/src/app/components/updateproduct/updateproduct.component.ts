import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ProductServices } from '../services/product-services.service';

@Component({
  selector: 'app-updateproduct',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './updateproduct.component.html',
  styleUrl: './updateproduct.component.css'
})
export class UpdateproductComponent {
editForm!: FormGroup;
  productId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductServices,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.editForm = this.fb.group({
      title: [''],
      price: [0],
      category: [''],
      description: [''],
      image: ['']
    });

    this.productService.getProductById(this.productId).subscribe( product => {
      this.editForm.patchValue(product);
    });
  }

  updateProduct() {
    this.productService.updateProduct(this.productId, this.editForm.value).subscribe(() => {
      alert('Product updated successfully');
      this.router.navigate(['/']);
    });
  }
}
