import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getProducts() {
    return this.http.get('http://localhost:3000/products');
  }
  getProductById(id: string) {
    return this.http.get('http://localhost:3000/products/' + id);
  }
  updateProduct(id: string, product: any) {
    return this.http.patch('http://localhost:3000/products/' + id, product);
  }
  addProduct(product: any) {
    return this.http.post('http://localhost:3000/products', product);
  }
  deleteProduct(id: string) {
    return this.http.delete('http://localhost:3000/products/' + id);
  }

  //===================================C A R T==========================

  addToCart(cartId: string, product: any) {
    return this.http.put(`http://localhost:3000/carts/${cartId}`, product);
  }

  getCartId() {
    return this.http.post('http://localhost:3000/carts', {});
  }
  getCartproductByProductId(productId: string) {
    return this.http.get('http://localhost:3000/carts/' + productId);
  }
  editCart(product: any) {
    return this.http.patch('http://localhost:3000/carts', product);
  }

  addPayment(cart: any) {
    return this.http.post('http://localhost:3000/payments', cart);
  }
  getPayments() {
    return this.http.get('http://localhost:3000/payments');
  }
}
