import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductModel, products} from '../global/products';
import {CartService} from '../service/cart-service/cart.service';
import {formatCurrency} from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  // home = 'back to home page';
  home: string;
  product: ProductModel;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.product = products[+params.get('productId')];
    });
  }

  addToCart(product: ProductModel) {
    // window.alert('Your product has been added to the cart!');
    console.log(`product added to cart: ${product.name}: ${formatCurrency(+product.price, 'en', 'USD')}: ${product.description || 'no description found'}`);
    this.cartService.addToCart(product);
  }
}
