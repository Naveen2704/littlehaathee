import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MainModule } from './main/main.module';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './main/about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthComponent } from './main/auth/auth.component';
import { RegisterComponent } from './main/register/register.component';
import { ShopComponent } from './main/shop/shop.component';
import { SingleComponent } from './main/single/single.component';
import { ProductsComponent } from './main/products/products.component';
import { ArtistsComponent } from './main/artists/artists.component';
import { ContactComponent } from './main/contact/contact.component';
import { GlobalService } from './global.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountComponent } from './main/account/account.component';
import { CheckoutComponent } from './main/checkout/checkout.component';
import { FooterComponent } from './main/footer/footer.component';
import { SinglePolicyComponent } from './main/single-policy/single-policy.component';
import { PlaceOrderComponent } from './main/place-order/place-order.component';
import { ConfirmOrderComponent } from './main/confirm-order/confirm-order.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AddressComponent } from './main/account/address/address.component';
import { EditaddressComponent } from './main/account/editaddress/editaddress.component';
import { ArtistviewComponent } from './main/artistview/artistview.component';
import { ArtworkComponent } from './main/artwork/artwork.component';
import { ArtworkViewComponent } from './main/artwork-view/artwork-view.component';
import { OrderViewComponent } from './main/account/order-view/order-view.component';

@NgModule({
  declarations: [
      AppComponent,
      MainComponent,
      AuthComponent,
      AboutComponent,
      RegisterComponent,
      ShopComponent,
      SingleComponent,
      ProductsComponent,
      ArtistsComponent,
      ContactComponent,
      AccountComponent,
      CheckoutComponent,
      FooterComponent,
      SinglePolicyComponent,
      PlaceOrderComponent,
      ConfirmOrderComponent,
      AddressComponent,
      EditaddressComponent,
      ArtistviewComponent,
      ArtworkComponent,
      ArtworkViewComponent,
      OrderViewComponent
    ],
  entryComponents: [],
  imports: [
      BrowserModule, IonicModule.forRoot(), AppRoutingModule,
      MatSidenavModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      MatSnackBarModule,
      NgbModule,
      NgxSkeletonLoaderModule
    ],
  providers: [
    //   { provide: LocationStrategy, useClass: HashLocationStrategy },
      Title
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
