/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GlobalService } from '../global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

    UserInfo: any = [];
    cartItems: any = [];
    total: any;
    menuList: any = [];
    
  constructor(public navCtrl: NavController, private router: Router, private service: GlobalService) {
      
      this.UserInfo = JSON.parse(localStorage.getItem('userInfo'));
      console.log(this.UserInfo);
   }

  ngOnInit() {
    this.menus();
    if(this.service.loginSub === undefined){
        this.service.loginSub = this.service.invokeLogin.subscribe((res:any)=>{
            this.checkLogin();
        });
    }
  }


  checkLogin(){
      this.UserInfo = JSON.parse(localStorage.getItem('userInfo'));
  }

  removeLogin(){
      this.UserInfo = null;
      console.log(this.UserInfo)
  }

  menus(){
    this.service.getCategories().subscribe((data: any) => {
        this.menuList = data.result.menusList;
    });
  }

  numeric(event){
    // String.fromCharCode(event).charCode);
    console.log(event.code);
    // var charCode = event.keyCode;

	// if ((charCode >= 48 && charCode <= 57) || charCode == 8)
	// 	return true;
	// else
	// 	return false;
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

  getCart(){
      this.service.cartList().subscribe((data: any) => {
        if(data.code === '200'){
            this.cartItems = data.result.cart;
            console.log(this.cartItems)
            var len = this.cartItems.length;
            this.total = data.result.cart[len-1].total;
            console.log(this.total)
        }
        else{
          this.cartItems = [];
          this.total = 0;
        }
      });
  }

  logout(){
      localStorage.removeItem('userInfo');
      Swal.fire({
          title: 'Success',
          html: 'Logged Out Successfully',
          icon: 'success',
          iconColor: '#0f0',
          timer: 2000,
          timerProgressBar:true,
          showConfirmButton: false
      }).then((result) => {
          result.dismiss;
      })
      this.removeLogin();
      this.router.navigate(['/home']);
  }

}
