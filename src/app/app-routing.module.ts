import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './main/about/about.component';
import { AccountComponent } from './main/account/account.component';
import { OrderViewComponent } from './main/account/order-view/order-view.component';
import { ArtistsComponent } from './main/artists/artists.component';
import { ArtistviewComponent } from './main/artistview/artistview.component';
import { ArtworkViewComponent } from './main/artwork-view/artwork-view.component';
import { ArtworkComponent } from './main/artwork/artwork.component';
import { AuthComponent } from './main/auth/auth.component';
import { CheckoutComponent } from './main/checkout/checkout.component';
import { ConfirmOrderComponent } from './main/confirm-order/confirm-order.component';
import { ContactComponent } from './main/contact/contact.component';
import { MainComponent } from './main/main.component';
import { PlaceOrderComponent } from './main/place-order/place-order.component';
import { ProductsComponent } from './main/products/products.component';
import { RegisterComponent } from './main/register/register.component';
import { ShopComponent } from './main/shop/shop.component';
import { SinglePolicyComponent } from './main/single-policy/single-policy.component';
import { SingleComponent } from './main/single/single.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
      path: 'home',
      loadChildren: () => import('./home/home.module').then( m => m.HomePageModule )
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainModule)
  },
  {
      path: '',
      component: MainComponent,
      children: [
          {
              path: 'auth',
              component: AuthComponent
          },
          {
              path: 'register',
              component: RegisterComponent
          },
          {
              path: 'about',
              component: AboutComponent
          },
          {
              path: 'shop',
              component: ShopComponent
          },
          {
              path: 'checkout',
              component: CheckoutComponent
          },
          {
              path: 'about',
              component: AboutComponent
          },
          {
              path: 'products/:id',
              component: ProductsComponent
          },
          {
              path: 'account',
              component: AccountComponent
          },
          {
              path: 'single/:id',
              component: SingleComponent
          },
          {
              path: 'policy/:id',
              component: SinglePolicyComponent
          },
          {
              path: 'contact',
              component: ContactComponent
          },
          {
              path: 'artists',
              component: ArtistsComponent
          },
          {
              path: 'place-order',
              component: PlaceOrderComponent
          },
          {
              path: 'confirm-order',
              component: ConfirmOrderComponent
          },
          {
              path: 'artistview/:id',
              component: ArtistviewComponent
          },
          {
              path: 'artwork',
              component: ArtworkComponent             
          },
          {
              path: 'artworkView/:id',
              component: ArtworkViewComponent
          },
          {
              path: 'orderView/:id',
              component: OrderViewComponent
          }
      ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
        useHash: true,
        preloadingStrategy: PreloadAllModules 
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
