import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { API_URL } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  STRIPE_TOKEN_ENDPOINT = 'https://connect.stripe.com/oauth/token'

  constructor(private http: HttpClient, private authService: AuthService) { }

  getConnectUserInfo(auth_code){
    let content = {
      /*client_secret : STRIPE_CLIENT_SECRET,*/
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
}
