import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss'],
})
export class OrderViewComponent implements OnInit {

  orderInfo: any = [];
  lineItems: any = [];
  userInfo: any = [];
  addressInfo: any = [];
  tracking_id: any;
  constructor(private route: ActivatedRoute, private service: GlobalService) {
    this.route.params.subscribe(params => {
      this.getOrderInfo(params.id)
    });
  }

  ngOnInit() {}

  getOrderInfo(order_id){
    this.service.viewOrder(order_id).subscribe((data: any) => {
      if(data.code === '200'){
        this.tracking_id = data.result.order[0].tracking_id;
        this.orderInfo = data.result.order;
        this.userInfo = data.result.userInfo;
        this.addressInfo = data.result.addressInfo;
      }
    });
  }

}
