import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { API_URL } from '../environments/environment';
import { User } from './models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject('')
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor(private http: HttpClient) { }

  get_auth_token(credentials){
    return this.http.post(API_URL + '/api-token-auth/', {username: credentials.email, password: credentials.password})
  }

  postLogin(){
  }
}
