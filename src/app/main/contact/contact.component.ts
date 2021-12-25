/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {

    contactForm: FormGroup;
    contactErr: number = 0;

  constructor(private form: FormBuilder, private service: GlobalService, private toast: ToastController, private router: Router) { 
      this.contactForm = this.form.group({
          name: ['', Validators.required],
          mobile: ['', Validators.required],
          email: ['', Validators.required],
          message: ['']
      });
  }

  ngOnInit() {

  }

  async contactSubmit(){
    if(this.contactForm.invalid){
        const alrt = await this.toast.create({
            message: 'Please Enter Required Fields',
            position: 'bottom',
            duration: 3000,
            cssClass: ['toast-class', 'danger-toast']
        });
        alrt.present();
        return;
    }
    this.service.contactSubmit(this.contactForm.value).subscribe(async (data: any) => {
        if(data.code === '200'){
            const alrt = await this.toast.create({
                message: 'Request Sent Successfully',
                position: 'bottom',
                duration: 3000,
                cssClass: ['toast-class', 'success-toast']
            });
            alrt.present();
            this.router.navigate(['/home']);
        }
        
    });
  }


}
