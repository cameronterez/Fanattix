import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FxEvent } from './models/event'
import { API_URL } from '../environments/environment';
import { TicketOption } from './models/ticket-option';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  events: FxEvent[] /*[
    {
      id: 1,
      name: 'Fall Family Fest',
      description: 'Afternoon with the kids and Free lunch',
      date: 'November 30',
      time: '3pm',
      location: '1145 Winchester Rd.',
      image: '../assets/imgs/baby-family.jpg'
    },
    {
      id: 1,
      name: 'Buddy Code',
      description: 'Sharpen those skills with an expert coder',
      date: 'September 23',
      time: '11am',
      location: '1145 Winchester Rd.',
      image: '../assets/imgs/code.jpeg'
    },
    {
      id: 1,
      name: 'Evening Gala',
      description: 'An Evening of Fun and Entertainment',
      date: 'October 1',
      time: '6pm',
      location: '1145 Winchester Rd.',
      image: '../assets/imgs/bake.jpeg'
    },

  ]*/

  constructor(private http: HttpClient) {  }

  getEvents(){
    return this.http.get<FxEvent[]>(API_URL + '/events/')
  }

  getEvent(eventId){
    return this.http.get<FxEvent>(API_URL + '/events/' + eventId + '/')
  }

  createEvent(data){
    return this.http.post(API_URL + '/events/', data)
  }

  createTicketOption(ticketOption: TicketOption){
    return this.http.post(API_URL + '/ticket-options/', ticketOption)
  }

}
