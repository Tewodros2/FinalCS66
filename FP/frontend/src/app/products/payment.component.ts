import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from './product.service';
@Component({
  selector: 'app-payment',
  template: `
    <div class="container">
      <ul>
        <li *ngFor="let payment of payments">
          <diV>userId :- {{ payment.userId }}</diV>
          <diV>cartId :- {{ payment.cartId }}</diV>
          <diV>Amount :- {{ payment.amount }}</diV>
          <diV>status :- {{ payment.status }}</diV>
          <diV>Date of Payment :- {{ payment.createdAt }}</diV>
        </li>
      </ul>
    </div>
  `,
  styles: [``],
})
export class PaymentComponent implements OnInit {
  constructor(private paymentService: ProductService) {}

  @Input() payments: any = {};

  ngOnInit(): void {
    this.getMyProducts();
  }

  getMyProducts() {
    this.paymentService.getPayments().subscribe({
      next: ({ payload }: any) => {
        console.log(payload);
        this.payments = payload;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addPayment() {
    this.paymentService.addPayment(this.payments).subscribe({
      next: ({ payload }: any) => {
        console.log(payload);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
