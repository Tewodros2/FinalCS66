import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  template: `
    <div *ngIf="whichRole() === 'buyer'">
      <a [routerLink]="['/', 'products']">Dashboard</a>
      <a [routerLink]="['/', 'products', 'all']">products List</a>
    </div>

    <div *ngIf="whichRole() === 'admin'">
      <a [routerLink]="['/', 'products']">Dashboard</a>
      <a [routerLink]="['/', 'products', 'main']">My products </a>
      <a [routerLink]="['/', 'products', 'add']">Add New Product </a>
    </div>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
      a {
        text-decoration: none;
        text-align: center;
        display: inline-block;
        margin: 10px 30px 10px 80px;
      }
    `,
  ],
})
export class ProductsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  whichRole() {
    const user = localStorage.getItem('user');
    if (!user) return '';

    return JSON.parse(user).role;
  }
}
