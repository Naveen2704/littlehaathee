import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { GlobalService } from 'src/app/global.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    // verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private service: GlobalService, private form: FormBuilder, private toast: ToastController, private route: Router) {
        this.registerForm = this.form.group({
            name: ['', Validators.required],
            mobile: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
   }

  ngOnInit() {}

  async registerUser(){
      if(this.registerForm.invalid){
        Swal.fire({
          title: 'Warning',
          html: 'Please fill all fields',
          icon: 'warning',
          iconColor: '#f00',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        })
        return;
      }
      this.service.register(this.registerForm.value).subscribe(async (data: any) => {
        if(data.code === '200'){
            Swal.fire({
              title: 'Success',
              html: 'Registration Successfull',
              icon: 'success',
              iconColor: '#0f0',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false
            })
            this.route.navigate(['/auth']);
        }
      });
  }


}
