import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {

    about: any = [];
  constructor(private service: GlobalService) { }

  ngOnInit() {
      this.abtInfo();
  }

  abtInfo(){
      this.service.getAbout().subscribe((data: any) => {
          if(data.code === '200'){
              this.about = data.result;
          }
      });
  }

}
