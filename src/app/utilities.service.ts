import { Injectable } from '@angular/core';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  DateAndTimeToDateTime(date, time){
    console.log(date)
    console.log(time)
    date = new Date(date + " " + time)
    return date
  }
}
