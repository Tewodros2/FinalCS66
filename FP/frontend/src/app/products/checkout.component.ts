import { Component, Input } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-cars',
  template: `
    <div class="container">
      <p>Number of Items in Carts: {{ carts.length }}</p>
      <ul>
        <li *ngFor="let cart of carts">
          {{ cart.buyerId }}
          <span
            [ngStyle]="{
              'background-color': cart.adopted ? 'red' : 'white'
            }"
            >{{ cart.adopted ? 'Sold to this buyer' : '' }}</span
          >
          <button *ngIf="!cart.adopted" (click)="adopt(cart)">Adopt</button>
        </li>
      </ul>
    </div>
  `,
  styles: [``],
})
export class CheckoutComponent {
  carts: Array<any> = [];
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
        this.carts = payload;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  adopt(cart: any) {
    // this.productService
    //   .addToCart({
    //     productId: cart.productId,
    //     cartId: cart._id,
    //   })
    //   .subscribe({
    //     next: ({ payload }: any) => {
    //     console.log(payload);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }
}
