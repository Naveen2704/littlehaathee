import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/global.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editaddress',
  templateUrl: './editaddress.component.html',
  styleUrls: ['./editaddress.component.scss'],
})
export class EditaddressComponent implements OnInit {

    data: any;
    info: any;
    addForm: FormGroup;
    constructor(private service: GlobalService, private form: FormBuilder, private router: Router, private modal: ModalController) {
      this.addForm = this.form.group({
          name: ['', Validators.required],
          mobile: ['', Validators.required],
          address: ['', Validators.required],
          city: ['', Validators.required],
          state:['', Validators.required],
          pincode: ['', Validators.required]
      })
     }
  
    ngOnInit() { }
    
    saveAddress(){
      if(this.addForm.invalid){
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
      this.service.editAddress(this.addForm.value, this.data.address_id).subscribe(async (data: any) => {
        if(data.code === '200'){
          Swal.fire({
              title: 'Success',
              html: 'Address updated successfully',
              icon: 'success',
              iconColor: '#0f0',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false
          }).then((result)=>{
              result.dismiss;
          });
          this.modal.dismiss();
          
          this.router.navigate(['/account']);
        }
      });
  }

}
