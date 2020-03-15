import {Component, OnInit} from '@angular/core';
import {CartService} from '../service/cart-service/cart.service';
import {ShippingModel} from '../global/shipping-model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  home = 'back to home page';

  // shippingCosts: ShippingModel[];
  // to try to use  a s y n c  in shipping.component.html
  shippingCosts: Observable<ShippingModel[]>;
  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
    // try {
    //   // returns '/assets/shipping.json'
    //   this.cartService.getShippingPrices()
    //     // JSON.parse(data as string)
    //     .subscribe(data => this.shippingCosts = data as ShippingModel[]);
    // } catch (e) {
    //   console.log(`************************* ${e}`);
    // }

    // try to use  a s y n c  in shipping.component.html
    this.shippingCosts = this.cartService.getShippingPrices() as Observable<ShippingModel[]>;
  }

}
