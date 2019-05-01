import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FxEvent } from './models/event'
import { API_URL } from '../environments/environment';
import { TicketOption } from './models/ticket-option';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  events: FxEvent[] 

  constructor(private http: HttpClient, private authService: AuthService) {  }

  getEvents(){
    return this.http.get<FxEvent[]>(API_URL + '/events/')
  }

  getEvent(eventId){
    return this.http.get<FxEvent>(API_URL + '/events/' + eventId + '/')
  }

  getMyEvents(user_id=this.authService._userId.value){
    return this.http.get<FxEvent[]>(API_URL + '/my-events/' + user_id)
  }

  createEvent(data){
    return this.http.post(API_URL + '/events/', data)
  }

  createTicketOption(ticketOption: TicketOption){
    return this.http.post(API_URL + '/ticket-options/', ticketOption)
  }

  editEvent(eventId, eventData){
    return this.http.put(API_URL + '/events/' + eventId + "/", eventData)
  }

}
