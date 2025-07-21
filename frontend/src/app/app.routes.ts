import {  RouterModule,Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailsComponent } from './components/details/details.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { UpdateproductComponent } from './components/updateproduct/updateproduct.component';

export const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'products', component:ProductsComponent},
  {path:'login', component:LoginComponent},
  {path:'register',component:RegisterComponent},
 { path: 'details/:id', component: DetailsComponent },
 {path:'cart',component:CartComponent},
 {path:'home',component:HomeComponent},
 {path:'newproduct',component:CreateProductComponent},
 {path:'updateproduct/:id',component:UpdateproductComponent}

];
