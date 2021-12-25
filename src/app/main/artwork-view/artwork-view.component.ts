import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-artwork-view',
  templateUrl: './artwork-view.component.html',
  styleUrls: ['./artwork-view.component.scss'],
})
export class ArtworkViewComponent implements OnInit {

  artworkList: any = [];
  productInfo: any = [];
  artistInfo: any = [];
  constructor(private route: ActivatedRoute, private service: GlobalService) {
    this.route.params.subscribe(params => {
      this.artworkInfo(params.id);
    });
   }

  ngOnInit() {}

  artworkInfo(artwork_id){
    this.service.singleArtwork(artwork_id).subscribe((data: any) => {
      if(data.code === '200'){
        this.artworkList = data.result.artwork
        this.artistInfo = data.result.artist
        this.productInfo = data.result.productList
        console.log(this.productInfo)
      }
    });
  }

}
