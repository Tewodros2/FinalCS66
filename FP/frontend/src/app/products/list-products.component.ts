import { Component, OnInit } from '@angular/core';
import { IProduct } from '../iproduct';
import { ProductService } from './product.service';
import { CommonService } from '../commen.service';
import api from '../config';

@Component({
  selector: 'app-list',
  template: `
    <div class="container">
      <div class="card" style="width: 18rem;" *ngFor="let product of products">
        <img
          class="card-img-top"
          [src]="getImage(product.picture)"
          alt="Card image cap"
          style=" height: 400px;"
        />
        <div lass="card-body">
          <diV>Product Name :- {{ product.name }}</diV>
          <diV>Category :- {{ product.category }}</diV>
          <diV>Description :- {{ product.description }}</diV>
          <diV>quantity :- {{ product.quantity }}</diV>
          <diV>price :- {{ product.price }}</diV>

          <!-- List of carts -->
          <app-carts
            *ngIf="selectedProductId === product._id"
            [productId]="product._id"
          ></app-carts>

          <app-edit
            [product]="selectedProduct"
            *ngIf="editId === product._id"
          ></app-edit>

          <button (click)="selectedProductId = product._id">View buyer</button>
          <button (click)="editProduct(product)" [ngStyle]="{ margin: '10px' }">
            Edit
          </button>
          <button (click)="deleteProduct(product._id)">Delete</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex: wrap;
        flex-direction: row;
        max-width: 90%;
        justify-content: center;
        margin-right: 10px;
        padding: 10px;
        margin-top: 4rem;
      }
      .card-body {
        margin-bottom: 0;
      }
    `,
  ],
})
export class ListProductsComponent implements OnInit {
  products: Array<IProduct> = [];
  selectedProductId: string = '';
  selectedProduct: any;
  editId: string = '';
  constructor(
    private productService: ProductService,
    private commonService: CommonService
  ) {
    console.log('list');
  }
  ngOnInit(): void {
    this.getMyproducts();
  }

  getMyproducts() {
    this.productService.getProducts().subscribe({
      next: ({ payload }: any) => {
        console.log(payload);
        this.products = payload;
        console.log(payload);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getImage(picName: string) {
    return `${api}/pictures/` + picName;
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe((response) => {
      this.products = this.products.filter((product) => product._id !== id);
    });
  }

  editProduct(product: any) {
    this.selectedProduct = product;
    this.editId = product._id;
    console.log(product);
  }
}
