import { Component, OnInit } from '@angular/core';
import { StripeService } from '../../stripe.service';
import { STRIPE_REDIRECT_URI } from '../../../environments/environment';

@Component({
  selector: 'app-stripe-oauth',
  templateUrl: './stripe-oauth.component.html',
  styleUrls: ['./stripe-oauth.component.css']
})
export class StripeOAuthComponent implements OnInit {
  connectedAccount: any
  STRIPE_REDIRECT_URI = STRIPE_REDIRECT_URI

  constructor(private stripeService: StripeService) { }

  ngOnInit() {
    this.getStripeConnectedAccount()
  }

  getStripeConnectedAccount(){
    this.stripeService.getStripeConnectedAccount().subscribe(
      res => {
        console.log(res)
        this.connectedAccount = res['connected_account']
        if(res.hasOwnProperty('connected_account')){
          this.stripeService._stripeActivated.next(true)
        }
        
      },
      err => console.log(err)
    )
  }

}
