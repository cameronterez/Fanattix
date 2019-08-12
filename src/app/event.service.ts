import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FxEvent } from './models/event'
import { API_URL } from '../environments/environment';
import { TicketOption } from './models/ticket-option';
import { AuthService } from './auth.service';
import { Ticket } from './models/ticket';
import { FxEventOccurrence } from './models/event-occurrence';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  events: FxEvent[]
  categories: any[]
  eventsNearBy = new BehaviorSubject<any>([]) 

  constructor(private http: HttpClient, private authService: AuthService) {  }

  getFees(){
    return this.http.get(API_URL + `/get-fees/`)
  }

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

  getEventsNearby(location){
    let coords = { latitude: location.latitude, longitude: location.longitude }
    return this.http.post(API_URL + `/events-near-location/`, {location : coords})
  }

  getMyEvents(user_id=this.authService._userId.value){
    return this.http.get<FxEvent[]>(API_URL + '/my-events/' + user_id)
  }

  createEvent(data){
    return this.http.post(API_URL + '/events/', data, {
      headers: {
        'Content-Type': 'Application/json'
      }      
    })
  }

  createEventOccurrence(data){
    return this.http.post<FxEventOccurrence>(API_URL + '/event-occurrences/', data)
  }

  editEventOccurrence(data){
    return this.http.put<FxEventOccurrence>(API_URL + `/event-occurrences/${data.id}/`, data)
  }

  getOccurrence(id){
    return this.http.get(API_URL + `/occurrences/${id}/`)
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

  deleteEvent(eventId){
    return this.http.delete(API_URL + `/events/${eventId}/`)
  }

  ////////Search////////
  searchEventsByName(search){
    return this.http.get<FxEvent[]>(API_URL + `/search-events-by-name/?name=${search}` )
  }

  searchEvents(search){
    return this.http.post<FxEvent[]>(API_URL + `/search-events-by-cld/`, search )
  }

  getFreeEvents(){
    return this.http.get<FxEvent[]>(API_URL + '/get-free-events/')
  }

  //Tickets//////////
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

  checkTicket(ticket_id){
    return this.http.get(API_URL + `/check-ticket/${ticket_id}/`)
  }

  deleteTicketOption(ticket_id){
    return this.http.delete(API_URL + `/ticket-options/${ticket_id}`)
  }

  //////Email///////
  sendEmailToPatrons(content){
    content['sender_id'] = this.authService._userId.value
    return this.http.post(API_URL + `/email-patrons/`, content)
  }

  /////Categories//////
  getEventsByCategory(categoryId: number){
    return this.http.get(API_URL + `/events-by-category/?categoryId=${categoryId}`)
  }

}
