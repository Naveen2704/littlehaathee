/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, EventEmitter } from '@angular/core';
import { url } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
    public sidenav: BehaviorSubject<any> = new BehaviorSubject(null);
    public proUrl: BehaviorSubject<any> = new BehaviorSubject(null);

    invokeLogin = new EventEmitter();
    loginSub: Subscription;

    productsCheck = new EventEmitter();
    proSub: Subscription;

  constructor(private http: HttpClient, private loader: LoadingController, private router: Router) { }

  toggleCart(){
      this.sidenav.next(null);
  }

  enableLogin(){
      this.invokeLogin.emit();
  }

  sleep(){
      this.invokeLogin.emit();
  }

  checkProUrl(){
      this.productsCheck.emit();
  }

  generalSettings(){
      return this.http.get(url + 'generalSettings');
  }

  aboutInfo(){
      return this.http.get(url + 'about');
  }

  getCategories(){
      return this.http.get(url + 'GetCategories');
  }

  catProducts(cat_id: any){
      return this.http.get(url + 'products/' + cat_id);
  }

  getSinglePro(pro_id: number){
    return this.http.get(url + 'singlePro/' + pro_id);
  }

  getArtists(){
    return this.http.get(url + 'getArtists');
  }

  getCMS(type: any){
    return this.http.get(url + 'getCms/' + type);
  }

  getAbout(){
      return this.http.get(url + 'about');
  }

  getSliders(){
    return this.http.get(url + 'sliders');
  }

  getProfile(){
    let userData = JSON.parse(localStorage.getItem('userInfo')); 
    return this.http.get(url + 'getProfile/' + userData.user_id);
  }

  updateProfile(data){
    let userData = JSON.parse(localStorage.getItem('userInfo'));
    let fd = new FormData();
    fd.append('name', data.name);
    fd.append('mobile', data.mobile);
    fd.append('email', data.email);
    fd.append('user_id', userData.user_id);
    return this.http.post(url + 'updateProfile', fd);
  }

  changePwd(data){
    let userData = JSON.parse(localStorage.getItem('userInfo'));
    let fd = new FormData();
    fd.append('old', data.old);
    fd.append('password', data.password);
    fd.append('user_id', userData.user_id);
    return this.http.post(url + 'changePwd', fd);
  }

  getPolicies(){
      return this.http.get(url + 'policies');
  }

  getSinglePolicy(policy_id){
      return this.http.get(url + 'singlePolicy/' + policy_id);
  }

  getColorImages(product_id: any, color: any){
      return this.http.get(url + 'colorImages/' + product_id + '/' + color);
  }

  addressList(){
      let userData = JSON.parse(localStorage.getItem('userInfo'));
      return this.http.get(url + "/getAddress/" + userData.user_id);
  }

  placeorder(cart_items){
      let userData = JSON.parse(localStorage.getItem('userInfo'));
      let fd = new FormData();
      fd.append("cart_items", cart_items);
      return this.http.post(url + "placeOrder", fd);
  }

  removeCartItem(cart_id){
    return this.http.get(url + "remCart/" + cart_id);
  }

  updateQty(cart_id, qty){
    return this.http.get(url + 'updateQty/' + cart_id + '/' + qty)
  }

  addOnlyAddress(data){
      let userData = JSON.parse(localStorage.getItem('userInfo'));
      let fd = new FormData();
      fd.append("name", data.name);
      fd.append("mobile", data.mobile);
      fd.append("address", data.address);
      fd.append("state", data.address);
      fd.append("city", data.city);
      fd.append("pincode", data.pincode);
      fd.append("user_id", userData.user_id);
      return this.http.post(url + "addressonly", fd);
  }

  editAddress(data, address_id){
      let userData = JSON.parse(localStorage.getItem('userInfo'));
      let fd = new FormData();
      fd.append("name", data.name);
      fd.append("mobile", data.mobile);
      fd.append("address", data.address);
      fd.append("state", data.state);
      fd.append("city", data.city);
      fd.append("pincode", data.pincode);
      fd.append("user_address_id", address_id);
      return this.http.post(url + "modifyAddress", fd);
  }

  addAddress(data){
      let userData = JSON.parse(localStorage.getItem('userInfo'));
      let fd = new FormData();
      fd.append("name", data.name);
      fd.append("mobile", data.mobile);
      fd.append("address", data.address);
      fd.append("state", data.state);
      fd.append("city", data.city);
      fd.append("pincode", data.pincode);
      fd.append("user_id", userData.user_id);
      return this.http.post(url + "address", fd);
  }

  deliver(address_id){
      let userData = JSON.parse(localStorage.getItem('userInfo'));
      return this.http.get(url + "addAddress/" + address_id + "/" + userData.user_id);
  }

  verifySign(response) {
    let fd = new FormData();
    fd.append('razorpay_signature', response.razorpay_signature);
    fd.append('razorpay_payment_id', response.razorpay_payment_id);
    fd.append('razorpay_order_id', response.razorpay_order_id)
    return this.http.post(url + 'verifySignature', fd)
  }

  contactSubmit(data: any){
    let fd= new FormData();
    fd.append('name', data.name);
    fd.append('mobile', data.mobile);
    fd.append('email', data.email);
    fd.append('description', data.message);
    return this.http.post(url + 'contact', fd);  
  }

  getArtistInfo(artist_id){
    return this.http.get(url + 'artistInfo/' + artist_id);
  }

  gteOrders(){
      let user_id = JSON.parse(localStorage.getItem('userInfo'));
      return this.http.get(url + 'ordersList/' + user_id.user_id);
  }

  getAddress(){
      let user_id = JSON.parse(localStorage.getItem('userInfo'));
      return this.http.get(url + 'address/' + user_id.user_id);
  }

  removeAddress(address_id){
    return this.http.get(url + 'remAddress/' + address_id);
  }

  artistInfo(artist_id){
      return this.http.get(url + 'artistView/' + artist_id);
  }

  artworks(){
      return this.http.get(url + 'artwork');
  }

  register(data: any){
    let fd = new FormData();
    fd.append('name', data.name);
    fd.append('mobile', data.mobile);
    fd.append('email', data.email);
    fd.append('password', data.password);
    return this.http.post(url + 'registration', fd);
  }

  login(data: any){
      let fd = new FormData();
      fd.append('email', data.email);
      fd.append('password', data.password);
      return this.http.post(url + 'login', fd);
  }

  cartList(){
      let userData = JSON.parse(localStorage.getItem('userInfo'));
      return this.http.get(url + 'getCart/' + userData.user_id);
  }

  placeOrder(){
      let userData = JSON.parse(localStorage.getItem('userInfo'));
      let fd = new FormData();
      fd.append("user_id", userData.user_id);
      return this.http.post(url + "placeOrder", fd);
  }

  async cart(pro_id, stock_id){
    const loading = await this.loader.create({
      cssClass: 'my-custom-class',
      message: 'Adding to Cart',
    });
    await loading.present();
    let userData = JSON.parse(localStorage.getItem('userInfo'));
    if(userData === null) {
      Swal.fire({
        title: 'Warning',
        html: 'Login Required',
        showConfirmButton: false,
        icon: 'warning',
        iconColor: '#f00',
        timer: 2000,
        timerProgressBar: true
      })
      loading.dismiss();
      this.router.navigate(['/auth'])
    }
    else {
      this.addToCart(pro_id, stock_id).subscribe((data: any) => {
          if(data.code === '200'){
              Swal.fire({
                  title: 'Cart',
                  html: 'Item Added Successfully!',
                  showConfirmButton: false,
                  icon: 'success',
                  iconColor: '#0f0',
                  timer: 2000,
                  timerProgressBar: true  
              }).then((result) => {
                result.dismiss;
            });
            loading.dismiss();
          }
      });
    }
    
  }

  addToCart(product_id: any, stock_id: any){
      let fd = new FormData();
      let userData = JSON.parse(localStorage.getItem('userInfo'));
      fd.append('user_id', userData.user_id);
      fd.append('product_id', product_id);
      fd.append('stock_id', stock_id);
      return this.http.post(url + 'addToCart', fd);
  }

  singleArtwork(artwork_id){
    return this.http.get(url + 'singleArtwork/' + artwork_id);
  }

  viewOrder(order_id){
    return this.http.get(url + 'orderView/' + order_id);
  }

}
