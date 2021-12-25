import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { AboutComponent } from './about/about.component';
import { IonicModule } from '@ionic/angular';
import { MainComponent } from './main.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [
      MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    IonicModule.forRoot(),
    MatSidenavModule,
    MatSnackBarModule,
    NgxSkeletonLoaderModule
  ],
  providers: [HttpClient, FormBuilder]
})
export class MainModule { }
