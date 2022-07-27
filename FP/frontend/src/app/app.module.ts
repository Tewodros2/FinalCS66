import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthPublicGuard } from './auth-public.guard';
import { InterceptorService } from './interceptor.service';
import { AboutComponent } from './about.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./products/products.module').then(
            (module) => module.ProductsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: '*',
        component: HomeComponent,
      },
      {
        path: 'signin',
        component: SigninComponent,
        canActivate: [AuthPublicGuard],
      },
      {
        path: 'signup',
        component: SignupComponent,
        canActivate: [AuthPublicGuard],
      },
    ]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
