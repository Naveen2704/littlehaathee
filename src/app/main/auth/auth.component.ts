/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/no-output-rename */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewChecked  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { GlobalService } from 'src/app/global.service';
import { MainComponent } from '../main.component';
import  Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit{

    loginForm: FormGroup;
    @Output() myFunc = new EventEmitter();

  constructor(private service: GlobalService, private form: FormBuilder, private toast: ToastController, private router: Router, private loader: LoadingController) {
      this.loginForm = this.form.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  ngOnInit() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if(userInfo != undefined){
      this.router.navigate(['/account']);
    }
  }

  async loginSubmit(){
    if(this.loginForm.invalid){
      Swal.fire({
          title: 'Error',
          html: 'Please fill all fields',
          icon: 'warning',
          iconColor: '#f00',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
      }).then((result) => {
          result.dismiss;
      })
      return;
    }
    const loading = await this.loader.create({
        cssClass: 'my-custom-class',
        message: 'Logging In',
        // duration: 2000
      });
    await loading.present();
    this.service.login(this.loginForm.value).subscribe(async (data: any) => {
      if(data.code === '200'){
          localStorage.setItem('userInfo', JSON.stringify(data.result.userInfo));
          Swal.fire({
              title: 'Success',
              html: 'Logged in Successfully! Keep Shopping',
              icon: 'success',
              iconColor: '#0f0',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
          }).then((result) => {
              result.dismiss;
          })
          loading.dismiss();
          this.service.enableLogin();
          this.router.navigate(['/account']);
          // this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          //     this.router.navigate(['/about']));
          // location.reload();
      }
      else{
        loading.dismiss();
        Swal.fire({
            title: 'Invalid',
            html: 'Provided Credentials are Incorrect',
            icon: 'error',
            iconColor: '#f00',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        }).then((result) => {
            result.dismiss;
        })
      }
    });
}

}
