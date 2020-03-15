import { Component, OnInit } from '@angular/core';
import {CartService} from '../service/cart-service/cart.service';
import {ProductModel} from '../global/products';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserControlsFormGroupModel} from '../global/shipping-model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  home = 'back to home page';
  items: ProductModel[];
  checkoutForm: FormGroup;
  // controlsConfig: UserControlsFormGroupModel;
    constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
  ) {
      // this.controlsConfig.name = '';
      // this.controlsConfig.address = '';
      // this.checkoutForm = this.formBuilder.group(this.controlsConfig);
      this.checkoutForm = this.formBuilder.group({
        name: '',
        address: ''
      });
  }

  ngOnInit() {
    this.items = this.cartService.getItems();
  }

  onSubmit(customerData) {
    // Process checkout data here
    console.warn('Your order has been submitted', customerData);

    this.items = this.cartService.clearCart();
    this.checkoutForm.reset();
  }
}
