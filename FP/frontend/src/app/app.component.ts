import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <!-- <h1>WelCome Ted Electronics</h1>
      <span class="welcome"> Hello :- {{ userName }} :) [{{ role }}] </span> -->
    <div class="bar" *ngIf="isLoggedIn()">
      <a [routerLink]="['/']">Home</a>
      <a [routerLink]="['/', 'products']">Product</a>
      <!-- <button (click)="onLogout()" [ngStyle]="{ 'margin-left': '600px' }">
          Logout
        </button> -->
    </div>
    <div class="appBody">
      <div class="bar" *ngIf="!isLoggedIn()">
        <a [routerLink]="['/signin']">Signin </a>
        <a [routerLink]="['/signup']">Signup</a>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      a {
        text-decoration: none;
        text-align: center;
        display: inline-block;
        margin: 10px 30px 10px 80px;
        color: black;
      }
      h1 {
        font-size: 50px;
        background-color: azure;
        font-style: italic;
        text-align: center;
      }
      .appBody {
        background-color: whitesmoke;
      }
      .bar {
        width: auto;
        height: 53px;
        background-color: thistle;
      }
      .welcome {
        font-size: 25px;
        color: blue;
        justify-content: center;
        margin-left: 50%;
      }
    `,
  ],
})
export class AppComponent {
  title = 'frontend';
  userName = '';
  role = '';
  constructor(private router: Router) {}
  isLoggedIn() {
    const token = localStorage.getItem('token');
    var user = localStorage.getItem('user');
    if (user != null) {
      this.userName = JSON.parse(user).name;
      this.role = JSON.parse(user).role;
    }
    return token ? true : false;
  }
  onLogout() {
    console.log('logout clicked');
    localStorage.clear();
    this.router.navigateByUrl('/signin');
  }
}
