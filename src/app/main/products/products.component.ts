/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
    Cat_id: number;
    proList: any;

  constructor(private route: ActivatedRoute, private service: GlobalService) {
   }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.Cat_id = params['id'];
      this.Catproducts(this.Cat_id);
    });
  }

  Catproducts(catid: number){
      this.service.catProducts(catid).subscribe((data: any) => {

          this.proList = data.result.productList;
          console.log(this.proList);
      });
  }

  addCart(pro_id, stock_id) {
    this.service.cart(pro_id, stock_id)
  }

}
