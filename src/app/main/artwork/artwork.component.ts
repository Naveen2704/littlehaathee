import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-artwork',
  templateUrl: './artwork.component.html',
  styleUrls: ['./artwork.component.scss'],
})
export class ArtworkComponent implements OnInit {

    artworkInfo: any = [];
  constructor(private service: GlobalService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.artworkList()
    });
   }

  ngOnInit() {
      
  }

  artworkList(){
      this.service.artworks().subscribe((data: any) => {
        if(data.code === '200'){
            this.artworkInfo = data.result.artwork
        }
      });
  }

}
