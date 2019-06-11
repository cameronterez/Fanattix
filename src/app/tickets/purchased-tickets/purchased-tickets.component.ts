import { Component, OnInit } from '@angular/core';
import { EventService } from '../../event.service';
import { Ticket } from '../../models/ticket';
import { API_URL } from '../../../environments/environment';

@Component({
  selector: 'app-purchased-tickets',
  templateUrl: './purchased-tickets.component.html',
  styleUrls: ['./purchased-tickets.component.css']
})
export class PurchasedTicketsComponent implements OnInit {
  tickets: Ticket[]
  API_URL = API_URL

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getPurchasedTickets()
  }

  getPurchasedTickets(){
    this.eventService.get_purchased_tickets().subscribe(
      res => {
        this.tickets = res
        console.log(res) 
      },
      err => console.log(err)
    )
  }

}
