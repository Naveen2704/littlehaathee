import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GlobalService } from 'src/app/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {

    cartItems: any = [];
    total: any;
  constructor(private service: GlobalService, private toast: ToastController, private router: Router, private route: ActivatedRoute) { 
    this.route.params.subscribe((data: any) => {
      this.getCart()
    });
  }

  ngOnInit() {
      // this.getCart();
  }

  getCart(){
      this.service.cartList().subscribe((data: any) => {
        if(data.code === '200'){
            this.cartItems = data.result.cart;
            var len = this.cartItems.length;
            this.total = data.result.cart[len-1].total;
            console.log(this.cartItems);
        }
      });
  }

  place_order(){
      this.service.placeOrder().subscribe((data: any) => {
        if(data.code === '200'){
            this.router.navigate(['/place-order']);
        }
      });
  }

  plus(i){
    if(this.cartItems[i].qty >= 1){
      var qty = this.cartItems[i].qty++;
      // var price = this.cartItems[i].price;
      // var sp_price = this.cartItems[i].sp_price;
      
      // if(sp_price > 0){
      //   this.total = parseInt(this.total) + parseInt(sp_price)
      // }
      // else{
      //   this.total = parseInt(this.total) + parseInt(price)
      // }
      console.log(qty)
      this.service.updateQty(this.cartItems[i].cart_id,qty+1).subscribe((data: any) => {
        this.getCart();
      })
    }    
  }

  minus(i){
    if(this.cartItems[i].qty > 1){
      var qty = this.cartItems[i].qty--;
      // var price = this.cartItems[i].price;
      // var sp_price = this.cartItems[i].sp_price;
      // if(sp_price > 0){
      //   this.total = parseInt(this.total) - parseInt(sp_price)
      // }
      // else{
      //   this.total = parseInt(this.total) - parseInt(price)
      // }
      this.service.updateQty(this.cartItems[i].cart_id,qty-1).subscribe((data: any) => {
        this.getCart();
      })
    }    
  }

  removeCart(cart_id){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if(result.isConfirmed) {
        this.service.removeCartItem(cart_id).subscribe((data: any) => {
          if(data.code === '200'){
            Swal.fire({
              title: 'Success',
              html: 'Cart Item Removed',
              icon: 'success',
              iconColor: '#0f0',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true
            })
            this.getCart();
          }
        });
      }
    })
  }

}
