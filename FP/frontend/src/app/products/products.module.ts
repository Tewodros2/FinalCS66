import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ListProductsComponent } from './list-products.component';
import { EditProductComponent } from './edit-product.component';
import { AddProductsComponent } from './add-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartsComponent } from './carts.component';
import { RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { BuyerListComponent } from './buyer-list.component';
import { PaymentComponent } from './payment.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ListProductsComponent,
    EditProductComponent,
    AddProductsComponent,
    CartsComponent,
    CheckoutComponent,
    BuyerListComponent,
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProductsComponent,
        children: [
          { path: 'add', component: AddProductsComponent },
          { path: 'all', component: BuyerListComponent },
          { path: 'main', component: ListProductsComponent },
          { path: 'cart', component: CartsComponent },
          { path: 'payment', component: PaymentComponent, data: {} },
        ],
      },
    ]),
  ],
})
export class ProductsModule {}
