/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { GlobalService } from 'src/app/global.service';
import { ArtistsComponent } from '../artists/artists.component';
import { pro_imagesUrl } from '../../../environments/environment';
import Swal from 'sweetalert2';
import { ArtistPopupComponent } from './artist-popup/artist-popup.component';
 
@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
})
export class SingleComponent implements OnInit {
    Cat_id: number;
    proList: any;
    artist: any;
    imageUrl: any = pro_imagesUrl;
    featuredImage: any;
    relatedList: any;
    additional_images: any = [];
    colorSelection: boolean = false;

  constructor(private route: ActivatedRoute, private service: GlobalService, private toast: ToastController, private router: Router, private loader: LoadingController, private modal: ModalController) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.Cat_id = params['id'];
    });
    this.singlePro(this.Cat_id);
  }

  openPro(product_id){
    this.router.navigateByUrl('/single/' + product_id);
  }

  artistInfo(artist_id){
    this.service.getArtistInfo(artist_id).subscribe(async (data: any) => {
        if(data.code === '200'){
            this.artist = data.result.info;
            const popup = await this.modal.create({
              component: ArtistPopupComponent,
              componentProps: { value: this.artist }
            })
            await popup.present();
            console.log(this.artist);
        }
    });
  }


  Catproducts(catid: number){
    this.service.catProducts(catid).subscribe((data: any) => {

        this.relatedList = data.result.productList;
        console.log(this.proList);
    });
}
  singlePro(catid: number){
      this.service.getSinglePro(catid).subscribe((data: any) => {
          this.proList = data.result.productList;
          this.featuredImage = this.proList[0].product_image;
          this.additional_images = this.proList[0].additional_images;
          this.Catproducts(this.proList[0].category_id);
      });
  }

  changeImg(img){
      this.featuredImage = img;
  }

  colorImages(product_id, color){
      this.service.getColorImages(product_id, color.substring(1)).subscribe((data: any) => {
        if(data.code === '200'){
            this.featuredImage = data.result.list[0].featured_image;
            this.additional_images = data.result.list[0].additional_images;
        }
      });
  }

  checkColor() {

  }

  addCart(pro_id, stock_id) {
    this.service.cart(pro_id, stock_id);
  }

}
