/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    pages: any=[];
    public selectedIndex = 0;
      public UserInfo =  JSON.parse(localStorage.getItem('userInfo'));  
      public images = ['slide1.jpg', 'shopBG.jpg', 'shop.jpg'];

      catList: any = [];
      proList: any = [];
      story: any = [];
      feeding: any = [];
      social: any = [];
      cartItems: any = [];
      appInfo: any = [];
      total: any = 0;
      menus: any = [];
      policyList: any = [];
      year = new Date().getFullYear();
  constructor(private service: GlobalService) { 
      // this.appInfo = JSON.parse(localStorage.getItem('info'));
      // console.log(this.appInfo.darkLogo)
  }

  ngOnInit() {
    this.getCategories();
    this.products();
    this.getStory();
    this.getFeeding();
    this.getSocial();
    this.menusList();
    this.policiesList();
    if(this.service.loginSub === undefined){
        this.service.loginSub = this.service.invokeLogin.subscribe((res:any)=>{
            this.checkLogin();
        });
    }
  }
  
  policiesList(){
    this.service.getPolicies().subscribe((data: any) => {
      if(data.code === '200'){
          this.policyList = data.result.policies;
      }
    });
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

  menusList(){
    this.service.getCategories().subscribe((data: any) => {
        this.menus = data.result.menusList;
        console.log(this.menus)
    });
  }

    checkLogin() {
        this.UserInfo = JSON.parse(localStorage.getItem('userInfo'));
    }


  getStory(){
    this.service.getCMS('Our Story').subscribe((data: any) => {
      this.story = data.result;
      console.log(this.story);
    });
  }

  getFeeding(){
    this.service.getCMS('Feeding Creativity').subscribe((data: any) => {
      this.feeding = data.result;
    });
  }

  getSocial(){
    this.service.getCMS('Social Enterprise').subscribe((data: any) => {
      this.social = data.result;
    });
  }
  
  products(){
    this.service.catProducts('all').subscribe((data: any) => {
        this.proList = data.result.productList;
        console.log(this.proList);
    });
  }

  getCategories(){
      this.service.getCategories().subscribe((data: any) => {
        this.catList = data.result.menusList;
      });
  }

  refreshing(event: any) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
