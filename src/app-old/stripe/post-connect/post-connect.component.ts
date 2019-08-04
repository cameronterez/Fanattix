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
  userMessage = ''

  constructor(
    private route: ActivatedRoute, 
    private messageService: MessageService,
    private stripeService: StripeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(
      params => {
        if(params['params']['error'] != undefined || params['params']['error'] != null){
          //If there was an error, handle it here
          console.log(params['params']['error'])
          console.log(params['params']['error_description'])
          this.userMessage = params['error']['error_description']
        }else{
          console.log(params)
          this.authorization_code = params['params']['code']
          console.log(this.authorization_code)
          this.getConnectUserInfo(this.authorization_code)
          this.userMessage = 'You Have successfully Connected Your Account!'  
        }    
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

  goToAccountSettings(){
    this.router.navigate(['account-settings'])
  }

}
