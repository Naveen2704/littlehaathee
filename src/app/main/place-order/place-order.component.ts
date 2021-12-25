import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GlobalService } from 'src/app/global.service';
import Swal from 'sweetalert2';
import { Checkout } from 'capacitor-razorpay';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
})
export class PlaceOrderComponent implements OnInit {

    addList: any = [];
    addForm: FormGroup;
    address_flag: any = 'false';
  constructor(private service: GlobalService, private form: FormBuilder, private router: Router, private toast: ToastController) {
      this.addForm = this.form.group({
          name: ['', Validators.required],
          mobile: ['', Validators.required],
          address: ['', Validators.required],
          city: ['', Validators.required],
          state:['', Validators.required],
          pincode: ['', Validators.required]
      })
   }

  ngOnInit() {
      console.log(this.address_flag);
      this.address();
  }

  address(){
      this.service.addressList().subscribe((data: any) => {
        if(data.code === '200'){
            this.addList = data.result.list;
        }
      });
  }

  deliverHere(address_id){
    this.service.deliver(address_id).subscribe(async (data: any) => {
        if(data.code === '200'){
            let res = data.result;
            this.payWithRazorpay(res.transaction_id, res.amount)
            // Swal.fire({
            //   title: 'Success',
            //   html: 'Order Placed Successfully',
            //   icon: 'success',
            //   iconColor: '#0f0',
            //   showConfirmButton: false,
            //   timer: 2000,
            //   timerProgressBar: true
            // })
            // this.router.navigate(['/confirm-order']);
        }
    });
  }

  async payWithRazorpay(receipt, amount){
    const options = { 
      key: 'rzp_test_pXaVedARBicyO1',
      amount: amount,
      description: 'Great offers', 
      image: 'https://i.imgur.com/3g7nmJC.png', 
      order_id: receipt,//Order ID generated in Step 1
      currency: 'INR', 
      name: 'Little Haathee', 
      prefill: { 
        email: 'gaurav.kumar@example.com', 
        contact: '9191919191'
      },
      theme: {
        color: '#a01e20'
      }
    }
    try {
      let data = (await Checkout.open(options));
      this.service.verifySign(data.response).subscribe((res: any) => {
        console.log(res)
      });
      
    } catch (error) {
      error = JSON.parse(error)
      console.log(error.description)
        Swal.fire({
          title: 'Error',
          html: error.description,
          icon: 'error',
          iconColor: '#f00',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        })
    }
  }

  saveAddress(){
      if(this.addForm.invalid){
          return;
      }
      this.service.addAddress(this.addForm.value).subscribe(async (data: any) => {
        if(data.code === '200'){
            this.address();
            Swal.fire({
              title: 'Success',
              html: 'Order Placed Successfully',
              icon: 'success',
              iconColor: '#0f0',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true
            })
            this.router.navigate(['/confirm-order']);
        }
      });
  }

}
