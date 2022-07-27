import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from '../commen.service';
import { IProduct } from '../iproduct';
import { ProductService } from './product.service';

@Component({
  selector: 'app-buyer',
  template: `
    <div class="container">
      <div class="card" style="width: 18rem;" *ngFor="let product of products">
        <img
          class="card-img-top"
          [src]="getImage(product.picture)"
          alt="Card image cap"
        />
        <div lass="card-body">
          <div>Product Name :- {{ product.name }}</div>
          <div>Category :- {{ product.category }}</div>
          <div>Description :- {{ product.description }}</div>
          <div>Quantity :- {{ product.quantity }}</div>
          <div>Price :- {{ product.price }}</div>

          <button
            (click)="sendToCart(product)"
            [ngStyle]="{ margin: '10px', width: '150px' }"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .list {
        display: flex;
        flex-direction: column;
        margin-left: 100px;
      }
      ,
      .container {
        max-width: 90%;
        margin: 10px;
      }
    `,
  ],
})
export class BuyerListComponent implements OnInit {
  products: Array<IProduct> = [];
  carts: Array<any> = [];
  subscribe!: Subscription;
  selectedproduct: any;
  constructor(
    private ProductService: ProductService,
    private commonService: CommonService
  ) {}
  ngOnInit(): void {
    this.getMyProducts();
  }

  getMyProducts() {
    this.ProductService.getProducts().subscribe({
      next: ({ payload }: any) => {
        console.log(payload);
        this.products = payload;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getImage(picName: string) {
    return 'http://localhost:3000/pictures/' + picName;
  }
  async sendToCart(product: any) {
    this.ProductService.getCartId().subscribe({
      next: ({ payload }: any) => {
        console.log(payload);
        this.addToCart(payload._id, product);
      },
      error: () => {},
    });
  }
  addToCart(cartId: string, product: any) {
    console.log(product);

    this.ProductService.addToCart(cartId, {
      products: [
        {
          productId: product._id,
          quantity: 1,
        },
      ],
    }).subscribe({
      next: ({ payload }: any) => {
        console.log(payload);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getCartByProductId(productId: string) {
    this.ProductService.getCartproductByProductId(productId).subscribe({
      next: ({ payload }: any) => {
        console.log(payload);
        this.carts = payload;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
