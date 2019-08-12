import { Component, OnInit } from '@angular/core';
import { StripeService } from '../../stripe.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-stripe-sign-up',
  templateUrl: './stripe-sign-up.component.html',
  styleUrls: ['./stripe-sign-up.component.css']
})
export class StripeSignUpComponent implements OnInit {
  connectedAccount
  hasConnectedAccount = false
  message = 'Retrieving Your Account'

  constructor(
    private stripeService: StripeService, 
    private authService: AuthService, 
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getStripeConnectedAccount()
  }

  getStripeConnectedAccount(){
    if(this.authService._loggedIn.value == true){
      this.stripeService.getStripeConnectedAccount().subscribe(
        res => {
          if(res.hasOwnProperty('connected_account')){
            if(res['connected_account'].length > 0){
              this.connectedAccount = res['connected_account']
              this.stripeService._stripeActivated.next(true)
              this.router.navigate(['creator'])
            }else{
              this.message = 'No Connected Account Found'
            }          
          }      
          
        },
        err => {
          console.log(err)
          this.message = 'An Error Occurred'
        }
      )
    }else{
      this.router.navigate(['sign-up'])
    }
  }

  goToStripeOauth(){
    this.router.navigate(['account-settings'])
  }

}
