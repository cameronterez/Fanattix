import { Component, OnInit, Input } from '@angular/core';
import { TicketOption } from '../../models/ticket-option';
import { EventService } from '../../event.service';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-ticket-options',
  templateUrl: './ticket-options.component.html',
  styleUrls: ['./ticket-options.component.css']
})
export class TicketOptionsComponent implements OnInit {
  @Input() eventId
  ticketOptions: TicketOption[] = []

  constructor(private eventService: EventService, private messageService: MessageService) { }

  ngOnInit(){
  }

  addTicketOption(){
    let ticket_option = new TicketOption()
    ticket_option.event = this.eventId
    this.ticketOptions.push(ticket_option)
    console.log(this.ticketOptions)
  }

  logTicket(ticket){
    console.log(ticket)
  }

  saveTicketOption(ticketOption: TicketOption){
    this.eventService.createTicketOption(ticketOption).subscribe(
      res => {
        console.log(res)
        this.messageService.displayMessage('Ticket created!')
      },
      err => console.log(err),
    )
  }

  

}
