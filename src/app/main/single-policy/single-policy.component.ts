import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-single-policy',
  templateUrl: './single-policy.component.html',
  styleUrls: ['./single-policy.component.scss'],
})
export class SinglePolicyComponent implements OnInit {

    policyInfo : any = [];
  constructor(private service: GlobalService, private route: ActivatedRoute) { 
      this.route.params.subscribe(params => {
          this.singlePolicyInfo(params['id']);
      })
  }

  ngOnInit() {}

  singlePolicyInfo(policy_id){
      this.service.getSinglePolicy(policy_id).subscribe((data: any) => {
        if(data.code === '200'){
            this.policyInfo = data.result.policies;
        }
      });
  }

}
