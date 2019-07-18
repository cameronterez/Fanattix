import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { API_URL } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilterServiceService {

  constructor(private http: HttpClient) { }

  filter(queryParams){
    console.log('filter in service')
    return this.http.post(API_URL + `/filter-events/`, queryParams)
  }
}
