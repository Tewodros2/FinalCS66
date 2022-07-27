import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: ` <div *ngIf="whichRole() === 'buyer'">
      <nav
        class="navbar navbar-expand-lg  .navbar-collapse navbar-light bg-light  sticky-top"
      >
        <div class="container-fluid">
          <div
            class="collapse navbar-collapse "
            [class.collapse]="navbarCollapsed"
            id="navbarTogglerDemo03"
          >
            <img
              src="../../assets/ted.jpg"
              *ngIf="togglNavbarCollapsing()"
              width=" 50 "
              class=" img-fluid brandlogo "
              alt="logo "
            />
            <a class="navbar-brand " href="# " *ngIf="togglNavbarCollapsing()">
            </a>
            <ul
              class="navbar-nav me-auto mb-2 mb-lg-0 "
              [class.navspace]="navbarCollapsed"
            >
              <li class="nav-item " [class.links]="navbarCollapsed">
                <a class="nav-link active " aria-current="page " href="# "
                  >Home</a
                >
              </li>

              <!-- <li class="nav-item " [class.links]="navbarCollapsed">
          <a
            class="nav-link "
            [routerLinkActive]="['active']"
            [routerLink]="['products/about']"
            >ABOUT
          </a>
        </li> -->
              <li class="nav-item " [class.links]="navbarCollapsed">
                <a
                  class="nav-link "
                  [routerLinkActive]="['active']"
                  [routerLink]="['/products/all']"
                  >LIST OF PRODUCT
                </a>
              </li>

              <li class="nav-item " [class.links]="navbarCollapsed">
                <a
                  class="nav-link "
                  [routerLinkActive]="['active']"
                  [routerLink]="['/products/cart']"
                >
                  CART
                </a>
              </li>
              <li>
                <button
                  class="nav-item "
                  (click)="onLogout()"
                  [ngStyle]="{ 'margin-left': '60px' }"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="card  text-white">
        <img src="../assets/cc4.jpg" class="card-img" alt="..." />
        <div class="card-img-overlay  cardbox">
          <!-- <h3 class="card-title">Hey there!</h3>
    <h3 class="card-title">I'm Tewodros Kidanu.</h3>
    <h3 class="card-title">MIU MSD-student</h3>
    <p class="card-text">
      I Build final project by using nodejs and Angular.
    </p> -->

          <button class="nav-item " [class.links]="navbarCollapsed">
            <a
              class="nav-link "
              [routerLinkActive]="['active']"
              [routerLink]="['/products/all']"
              >LIST OF PRODUCT
            </a>
          </button>
          <!-- <span><a [routerLink]="[ '/SignupTeacher'] " type="button" class="btn btn-secondary btn-lg  landingButton1">CONTACT</a>
       
    </span> -->
          <!-- <li class="nav-item ">
        <a class="nav-link " [routerLinkActive]="[ 'active'] " [routerLink]="[ '/contact']"> CONTACT </a>
    </li> -->
        </div>
      </div>
      <!-- <a [routerLink]="['/']"> Home </a> -->
      <!-- <a [routerLink]="['/', 'products']">Dashboard</a> -->
      <!-- <a [routerLink]="['/', 'products', 'all']">products List</a> -->
    </div>

    <div *ngIf="whichRole() === 'admin'">
      <nav
        class="navbar navbar-expand-lg  .navbar-collapse navbar-light bg-light  sticky-top"
      >
        <div class="container-fluid">
          <div
            class="collapse navbar-collapse "
            [class.collapse]="navbarCollapsed"
            id="navbarTogglerDemo03"
          >
            <img
              src="../../assets/ted.jpg"
              *ngIf="togglNavbarCollapsing()"
              width=" 50 "
              class=" img-fluid brandlogo "
              alt="logo "
            />
            <a class="navbar-brand " href="# " *ngIf="togglNavbarCollapsing()">
            </a>
            <ul
              class="navbar-nav me-auto mb-2 mb-lg-0 "
              [class.navspace]="navbarCollapsed"
            >
              <li class="nav-item " [class.links]="navbarCollapsed">
                <a class="nav-link active " aria-current="page " href="# "
                  >Home</a
                >
              </li>

              <!-- <li class="nav-item " [class.links]="navbarCollapsed">
          <a
            class="nav-link "
            [routerLinkActive]="['active']"
            [routerLink]="['products/about']"
            >ABOUT
          </a>
        </li> -->
              <li class="nav-item " [class.links]="navbarCollapsed">
                <a
                  class="nav-link "
                  [routerLinkActive]="['active']"
                  [routerLink]="['/products/main']"
                  >PRODUCTS
                </a>
              </li>
              <li class="nav-item " [class.links]="navbarCollapsed">
                <a
                  class="nav-link "
                  [routerLinkActive]="['active']"
                  [routerLink]="['products/payment']"
                  >PAYMENT
                </a>
              </li>
              <li class="nav-item " [class.links]="navbarCollapsed">
                <a
                  class="nav-link "
                  [routerLinkActive]="['active']"
                  [routerLink]="['/products/add']"
                >
                  ADD PRODUCT
                </a>
              </li>
              <li>
                <button
                  class="nav-item "
                  (click)="onLogout()"
                  [ngStyle]="{ 'margin-left': '60px' }"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="card  text-white">
        <img src="../assets/cc4.jpg" class="card-img" alt="..." />
        <div class="card-img-overlay  cardbox">
          <!-- <h3 class="card-title">Hey there!</h3>
    <h3 class="card-title">I'm Tewodros Kidanu.</h3>
    <h3 class="card-title">MIU MSD-student</h3>
    <p class="card-text">
      I Build final project by using nodejs and Angular.
    </p> -->

          <button class="nav-item " [class.links]="navbarCollapsed">
            <a
              class="nav-link "
              [routerLinkActive]="['active']"
              [routerLink]="['/products/main']"
              >PRODUCT LIST
            </a>
          </button>
          <!-- <span><a [routerLink]="[ '/SignupTeacher'] " type="button" class="btn btn-secondary btn-lg  landingButton1">CONTACT</a>
       
    </span> -->
          <!-- <li class="nav-item ">
        <a class="nav-link " [routerLinkActive]="[ 'active'] " [routerLink]="[ '/contact']"> CONTACT </a>
    </li> -->
        </div>
      </div>

      <!-- <a [routerLink]="['/', 'products']">Dashboard</a> -->
      <!-- <a [routerLink]="['/', 'products', 'main']">My products </a>
  <a [routerLink]="['/', 'products', 'add']">Add New Product </a>
  <a [routerLink]="['/', 'products', 'cart']">Cart List </a>
  <a [routerLink]="['/', 'products', 'payment']">Payment List </a> -->
    </div>`,
  styles: [
    `
      .navspace {
        margin-left: 10rem !important;
      }

      nav.navbar-light .navbar-nav .nav-link {
        color: #fff !important;
        justify-items: end;
      }
      .navbar-nav {
        justify-items: end;
      }
      .navbar-brand {
        color: #fff !important;
      }
      .nav-item:hover {
        background-color: black;
      }

      .navbar-toggler {
        background-color: #fff !important;
      }

      .navbar {
        background-color: thistle !important;
      }

      .leftNav {
        padding-right: 1rem !important;
      }

      .brandlogo {
        margin-left: 3rem !important;
      }

      .links {
        margin-right: 3rem;
      }

      .signinbutton {
        background-color: #e99542 !important;
        border-radius: 1rem;
        padding-left: 0 2rem 0 2rem;
      }
    `,
  ],
})
export class HomeComponent {
  navbarCollapsed: boolean = true;

  constructor(private router: Router) {}
  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;

    return this.navbarCollapsed;
  }
  togglNavbarCollapsing() {
    return this.navbarCollapsed;
  }
  onLogout() {
    console.log('logout clicked');
    localStorage.clear();
    this.router.navigateByUrl('/signin');
  }

  whichRole() {
    const user = localStorage.getItem('user');
    if (!user) return '';

    return JSON.parse(user).role;
  }
}
