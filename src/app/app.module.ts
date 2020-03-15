import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import {HttpClientModule} from '@angular/common/http';
import { ShippingComponent } from './shipping/shipping.component';
import { MediumComponent } from './medium/medium.component';
import { MediumRxjsPracticeComponent } from './medium/medium-rxjs-practice/medium-rxjs-practice.component';
import { DatepickerComponent } from './medium/datepicker/datepicker.component';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';

const mediumRoutes: Routes = [{path: 'rxjs_practice', component: MediumRxjsPracticeComponent},
  {path: 'datepicker', component: DatepickerComponent}];
const appRoutes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'products/:productId', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'shipping', component: ShippingComponent },
  { path: 'medium', component: MediumComponent },
  // { path: 'medium/rxjs_practice', component: MediumRxjsPracticeComponent },
  { path: 'medium', component: MediumComponent, children: mediumRoutes },
];

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent,
    ProductDetailsComponent,
    CartComponent,
    ShippingComponent,
    MediumComponent,
    MediumRxjsPracticeComponent,
    DatepickerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgxMyDatePickerModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
