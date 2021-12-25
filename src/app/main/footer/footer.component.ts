import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
    policyList: any = [];

  constructor(private service: GlobalService) { }

  ngOnInit() {
    this.policiesList();
  }

  policiesList(){
      this.service.getPolicies().subscribe((data: any) => {
        if(data.code === '200'){
            this.policyList = data.result.policies;
        }
      });
  }

}
