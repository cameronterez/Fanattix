import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { API_URL } from '../environments/environment';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  STRIPE_TOKEN_ENDPOINT = 'https://connect.stripe.com/oauth/token'
  _stripeActivated: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor(private http: HttpClient, private authService: AuthService) { }

  getConnectUserInfo(auth_code){
    let content = {
      user_id : this.authService._userId.value,
      code : auth_code,
      grant_type: 'authorization_code'
    }

    console.log(content)

    return this.http.post(API_URL + '/get-connect-user-info/', content)
  }

  sendToken(data){
    return this.http.post(API_URL + `/charge/`, data)
  }

  saveCard(data){
    return this.http.post(API_URL + '/save-card/', data)
  }

  getPaymentMethods(user_id=this.authService._userId.value){
    return this.http.get(API_URL + `/payment-methods/${user_id}/`)
  }

  getStripeConnectedAccount(user_id=this.authService._userId.value){
    return this.http.get(API_URL + `/connected-accounts/${user_id}/`)
  }

  stripeActivated(){
    return this._stripeActivated.value
  }
}
