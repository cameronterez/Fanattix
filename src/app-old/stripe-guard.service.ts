import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { StripeService } from './stripe.service';

@Injectable({
  providedIn: 'root'
})
export class StripeGuardService implements CanActivate{

  constructor(private stripeService: StripeService, private router: Router) { }

  canActivate(){
    if(!this.stripeService._stripeActivated.value){
      this.router.navigate(['activate-stripe-account'])
    }
    return this.stripeService._stripeActivated.value    
  }
}
