import { Component, Input, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
@Component({
  selector: 'app-artist-popup',
  templateUrl: './artist-popup.component.html',
  styleUrls: ['./artist-popup.component.scss'],
})
export class ArtistPopupComponent implements OnInit {

  artist: any = [];
  constructor(private navParams: NavParams) {
    this.artist = this.navParams.get('value')
  }

  ngOnInit() {}

}
