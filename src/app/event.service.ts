import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FxEvent } from './models/event'
import { API_URL } from '../environments/environment';
import { TicketOption } from './models/ticket-option';
import { AuthService } from './auth.service';
import { Ticket } from './models/ticket';

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

  createEventOccurrence(data){
    return this.http.post(API_URL + '/event-occurrences/', data)
  }

  createTicketOption(ticketOption: TicketOption){
    return this.http.post(API_URL + '/ticket-options/', ticketOption)
  }

  editEvent(eventId, eventData){
    return this.http.put(API_URL + '/events/' + eventId + "/", eventData)
  }

  ////////Search////////
  searchEventsByName(search){
    return this.http.get<FxEvent[]>(API_URL + `/search-events-by-name/?name=${search}` )
  }

  searchEvents(search){
    return this.http.get<FxEvent>(API_URL + `/search-events-by-location?date=${search.date}&location=${search.location}&date=${search.category}/` )
  }

  //Tickets
  purchaseTicket(ticketOptionId, userId=this.authService._userId.value){
    let content = { ticket_option_id : ticketOptionId, user_id : userId }
    return this.http.post(API_URL + '/purchase-ticket/', content)
  }

  get_purchased_tickets(userId=this.authService._userId.value){
    return this.http.get<Ticket[]>(API_URL + '/get-purchased-tickets/' + userId + '/' )
  }

}
