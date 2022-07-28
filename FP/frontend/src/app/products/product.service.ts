import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import api from '../config';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getProducts() {
    return this.http.get(`${api}/products`);
  }
  getProductById(id: string) {
    return this.http.get(`${api}/products/` + id);
  }
  updateProduct(id: string, product: any) {
    return this.http.patch(`${api}/products/` + id, product);
  }
  addProduct(product: any) {
    return this.http.post(`${api}/products`, product);
  }
  deleteProduct(id: string) {
    return this.http.delete(`${api}/products/` + id);
  }

  //===================================C A R T==========================

  addToCart(cartId: string, product: any) {
    return this.http.put(`${api}/carts/${cartId}`, product);
  }

  getCartId() {
    return this.http.post(`${api}/carts`, {});
  }
  getCartproductByProductId(productId: string) {
    return this.http.get(`${api}/carts/` + productId);
  }
  editCart(product: any) {
    return this.http.patch(`${api}/carts`, product);
  }

  addPayment(cart: any) {
    return this.http.post(`${api}/payments`, cart);
  }
  getPayments() {
    return this.http.get(`${api}/payments`);
  }
}
