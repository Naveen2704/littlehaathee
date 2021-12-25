import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
})
export class ArtistsComponent implements OnInit {

    list: any = [];
  constructor(private service: GlobalService) { }


  ngOnInit() {
    this.artistList();
  }

  artistList(){
    this.service.getArtists().subscribe((data: any) => {
        this.list = data.result.artists;
    });
  }

}
