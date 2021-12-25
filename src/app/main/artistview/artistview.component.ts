import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/global.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-artistview',
  templateUrl: './artistview.component.html',
  styleUrls: ['./artistview.component.scss'],
})
export class ArtistviewComponent implements OnInit {

    artist_id: any;
    artistInfo: any = [];
    productInfo: any = [];
    video_url: any;
    safeUrl: any;
  constructor(private route: ActivatedRoute, private service: GlobalService,private _sanitizer: DomSanitizer) {
      this.route.params.subscribe(param => {
        this.getArtistView(param.id)
      });
   }

  ngOnInit() {}

  getArtistView(id){
      this.service.artistInfo(id).subscribe((data: any) => {
          if(data.code === '200'){
            this.artistInfo = data.result.artistInfo;
            this.productInfo = data.result.productList;
            this.video_url = 'https://www.youtube.com/embed/' + this.artistInfo.video_link;
            this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.video_url);
            this.safeUrl = this.safeUrl.changingThisBreaksApplicationSecurity
            console.log(this.safeUrl)
            console.log(this.productInfo)
          }
      })
  }

}
