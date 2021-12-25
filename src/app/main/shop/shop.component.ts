/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Config } from '@ionic/angular';
// import { Config } from '@ionic/angular';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  Cat_list: any;

  constructor(public service: GlobalService) { }

  ngOnInit() {
      this.categoriesList();
  }

  categoriesList(){
      this.service.getCategories().subscribe((data: any) => {
        this.Cat_list = data.result.menusList;
      });
  }

}

