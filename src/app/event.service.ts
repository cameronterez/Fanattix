import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FxEvent } from './models/event'
import { API_URL } from '../environments/environment';
import { TicketOption } from './models/ticket-option';
import { AuthService } from './auth.service';
import { Ticket } from './models/ticket';
import { FxEventOccurrence } from './models/event-occurrence';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  events: FxEvent[]
  categories: any[] 

  constructor(private http: HttpClient, private authService: AuthService) {  }

  getCategories(){
    return this.http.get<any[]>(API_URL + `/categories/`)    
  }

  getTypes(){
    return this.http.get<any[]>(API_URL + `/types/`)    
  }

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
    return this.http.post<FxEventOccurrence>(API_URL + '/event-occurrences/', data)
  }

  editEventOccurrence(data){
    return this.http.put<FxEventOccurrence>(API_URL + `/events/${data.id}/`, data)
  }

  createTicketOption(ticketOption: TicketOption){
    return this.http.post(API_URL + '/ticket-options/', ticketOption)
  }

  editTicketOption(ticketOption: TicketOption){
    console.log(ticketOption)
    return this.http.put(API_URL + `/ticket-options/${ticketOption.id}/`, ticketOption)
  }

  editEvent(eventId, eventData){
    console.log(eventData)
    return this.http.put<FxEvent>(API_URL + '/events/' + eventId + "/", eventData)
  }

  ////////Search////////
  searchEventsByName(search){
    return this.http.get<FxEvent[]>(API_URL + `/search-events-by-name/?name=${search}` )
  }

  searchEvents(search){
    return this.http.post<FxEvent[]>(API_URL + `/search-events-by-cld/`, search )
  }

  //Tickets
  purchaseTicket(ticketOptionId, quantity, userId=this.authService._userId.value){
    let content = { 
      ticket_option_id : ticketOptionId, 
      user_id : userId,
      quantity: quantity
    }
    return this.http.post(API_URL + '/purchase-ticket/', content)
  }

  get_purchased_tickets(userId=this.authService._userId.value){
    return this.http.get<Ticket[]>(API_URL + '/get-purchased-tickets/' + userId + '/' )
  }

  getTicketOptionDetail(id){
    return this.http.get<TicketOption>(API_URL + `/ticket-option-detail/${id}`)
  }

}
