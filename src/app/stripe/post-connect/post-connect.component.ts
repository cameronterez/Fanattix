import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { MessageService } from '../../message.service';
import { StripeService } from '../../stripe.service';

@Component({
  selector: 'app-post-connect',
  templateUrl: './post-connect.component.html',
  styleUrls: ['./post-connect.component.css']
})
export class PostConnectComponent implements OnInit {
  authorization_code: any
  stripeUserInfo: any

  constructor(
    private route: ActivatedRoute, 
    private messageService: MessageService,
    private stripeService: StripeService
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(
      params => {
        console.log(params)
          this.authorization_code = params['params']['code']
          console.log(this.authorization_code)
          this.getConnectUserInfo(this.authorization_code)      
      }      
        ,
      err => console.log(err)
    )
  }

  getConnectUserInfo(authorization_code){
    this.stripeService.getConnectUserInfo(authorization_code).subscribe(
      res => {
        this.stripeUserInfo = res
        console.log(res)
      },
      err => console.log(err)
    )
  }

}
