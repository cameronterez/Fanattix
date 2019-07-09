import { Injectable } from '@angular/core';
import { Time } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  currentUrl = new BehaviorSubject('/')

  constructor() { }

  DateAndTimeToDateTime(date, time){
    console.log(date)
    console.log(time)
    date = new Date(date + " " + time)
    return date
  }

  scrollToElement(element) { //This function scrolls to specified element
    console.log(element)
    if(element != null && element != undefined){
      //window.scrollTo(element.yPosition)
      element.scrollIntoView({behavior: 'smooth'})
      console.log(element.yPosition)
    }
  }

  DateTimeToDateAndTime(datetime){
    let datetime_obj = new Date(datetime)
    //Format Date
    let year = datetime_obj.getFullYear()
    let month = addLeadingZeroes(datetime_obj.getMonth())
    let day = datetime_obj.getDate()

    let date = `${year}-${month}-${day}`

    //Format Time
    let hours = addLeadingZeroes(datetime_obj.getHours())
    let minutes = addLeadingZeroes(datetime_obj.getMinutes())
    let time = `${hours}:${minutes}`

    function addLeadingZeroes(ele){
      let el = ele.toString()
      if(el.length < 2){
        el = "0" + el
        return el
      }
      return el
    }

    return [date, time]
  }
  
}
