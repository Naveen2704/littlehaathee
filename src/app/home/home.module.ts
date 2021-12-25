import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HomePage } from './home.page';
import { FooterComponent } from '../main/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatSidenavModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
