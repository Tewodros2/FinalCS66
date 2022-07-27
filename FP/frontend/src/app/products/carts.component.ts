import { Component, Input } from '@angular/core';
import { ProductService } from './product.service';
@Component({
  selector: 'app-carts',
  template: `
    <div class="container">
      <p>Number of Items in Carts: {{ cart.products.length }}</p>
      <ul>
        <li *ngFor="let product of cart.products">
          <diV>Product Name :- {{ product.name }}</diV>
          <diV>Category :- {{ product.category }}</diV>
          <diV>Description :- {{ product.description }}</diV>
          <diV>quantity :- {{ product.quantity }}</diV>
          <diV>price :- {{ product.price }}</diV>
          <diV>
            <img
              [src]="getImage(product.picture)"
              alt=""
              style="width: 150px; height: 150px;"
              [ngStyle]="{ 'margin-bottom': '10px' }"
            />
          </diV>

        </li>
      </ul>
      <div>
        <button (click)="gotoPayment(cart)">Pay</button>
      </div>
    </div>
  `,
  styles: [``],
})
export class CartsComponent {
  cart: any = {
    products: [],
  };
  @Input('productId') productId: string = '';
  @Input('cartId') cartId: string = ''; //

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getCartByProductId();
  }
  getCartByProductId() {
    this.productService.getCartproductByProductId(this.productId).subscribe({
      next: ({ payload }: any) => {
        console.log(payload);
        this.cart = payload[0];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getImage(picName: string) {
    return 'http://localhost:3000/pictures/' + picName;
  }

  gotoPayment(cart: any) {
    const amount = cart.products.reduce(
      (sum: number, curr: any) => curr.quantity * curr.price + sum,
      0
    );

    this.productService
      .addPayment({
        amount: 2,
        cartId: cart._id,
        paymentMethod: 'CASH',
      })
      .subscribe({
        next: ({ payload }: any) => {
          console.log(payload);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
  ChangeStatus(cart: any) {
    // this.productService
    //   .addToCart({
    //     cart: cart,
    //     // productId: cart.productId,
    //     // cartId: cart._id,
    //   })
    //   .subscribe({
    //     next: ({ payload }: any) => {
    //       console.log(payload);
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     },
    //   });
  }
}
