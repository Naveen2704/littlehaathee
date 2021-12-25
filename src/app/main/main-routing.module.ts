import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '', redirectTo: 'm-about', pathMatch: 'full'
    }
];

@NgModule({
  imports: [
      RouterModule.forChild(routes),
      CommonModule
    ],
  exports: [RouterModule]
})
export class MainRoutingModule { }
