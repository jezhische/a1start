import { Injectable } from '@angular/core';
import {ProductModel} from '../../global/products';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items: ProductModel[] = [];
  constructor(
    private http: HttpClient
  ) { }

  addToCart(product: ProductModel) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getShippingPrices() {
    return this.http.get('/assets/shipping.json');
  }
}
