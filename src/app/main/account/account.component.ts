/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/global.service';
import { AddressComponent } from './address/address.component';
import Swal from 'sweetalert2';
import { EditaddressComponent } from './editaddress/editaddress.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  userInfo: any = [];
  orders: any = [];
  address: any = [];
  segment: string = "orders";
  profileInfo: any = [];
  updateProfileForm: FormGroup;
  updatePassword: FormGroup;

  constructor(private service: GlobalService, private modal: ModalController, private loader: LoadingController, private form: FormBuilder) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
   }

  ngOnInit() {
    this.updateProfileForm = this.form.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required]
    });
    this.updatePassword = this.form.group({
      old: ['', Validators.required],
      password: ['', Validators.required],
    });
      this.ordersList();
      this.addressList();
      this.getProfileInfo();
  }

  getProfileInfo(){
      this.service.getProfile().subscribe((data: any) => {
        if(data.code === '200'){
            this.profileInfo = data.result.userInfo;
        }
      });
  }

  changeProfile(){
      if(this.updateProfileForm.invalid){
        Swal.fire({
            title: 'Warning',
            html: 'Please fill all fields',
            icon: 'warning',
            iconColor: '#f00',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
        }).then((result)=>{
            result.dismiss;
        });
        return;
      }
      this.service.updateProfile(this.updateProfileForm.value).subscribe((data: any) => {
        if(data.code === '200'){
            Swal.fire({
                title: 'Success',
                html: 'Profile updated',
                icon: 'success',
                iconColor: '#0f0',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            }).then((result)=>{
                result.dismiss;
            });
            this.getProfileInfo();
        }
      });
  }

  changePassword(){
      if(this.updatePassword.invalid){
        Swal.fire({
            title: 'Warning',
            html: 'Please fill all fields',
            icon: 'warning',
            iconColor: '#f00',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false
        }).then((result)=>{
            result.dismiss;
        });
        return;
      }
      this.service.changePwd(this.updatePassword.value).subscribe((data: any) => {
        if(data.code === '200'){
            Swal.fire({
                title: 'Success',
                html: 'Password changed',
                icon: 'success',
                iconColor: '#0f0',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false
            }).then((result)=>{
                result.dismiss;
            });
            this.getProfileInfo();
        }
      });
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

  ordersList(){
      this.service.gteOrders().subscribe((data: any) => {
          if(data.code === '200'){
              this.orders = data.result.list;
          }
      });
  }

  async addAddress(){
    const modal = await this.modal.create({
        component: AddressComponent,
        cssClass: 'custom-modal'
    });
    modal.onDidDismiss().then((data) => {
        this.addressList();
    });
    return await modal.present();
  }
  
  addressList(){
    this.service.getAddress().subscribe((data: any) => {
        if(data.code === '200'){
            this.address = data.result.address;
        }
    });
  }

  async editAddress(data){
      const edit_modal = await this.modal.create({
        component: EditaddressComponent,
        cssClass: 'custom-modal',
        componentProps:{
            data: data
        }
      });
      edit_modal.onDidDismiss().then((data) => {
          this.addressList();
      });
      return await edit_modal.present();
  }

  async delAddress(address_id){
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
            this.service.removeAddress(address_id).subscribe(async (data: any)=>{
                if(data.code === '200'){
                    this.addressList();
                    Swal.fire({
                        title: 'Success',
                        html: 'Deleted successfully',
                        icon: 'success',
                        iconColor: '#0f0',
                        timer: 2000,
                        timerProgressBar: true,
                        showConfirmButton: false
                    }).then((result)=>{
                        result.dismiss;
                    });
                }
            });
        }
    })
  }


}
