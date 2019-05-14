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
  @Input() event
  createdTicketOptions: TicketOption[]
  ticketOptions: TicketOption[] = []

  constructor(private eventService: EventService, private messageService: MessageService) { }

  ngOnInit(){
    try{
      this.createdTicketOptions = this.event.ticket_options
    }catch{
      console.log('no ticket options')
    }
  }

  addTicketOption(){
    let ticket_option = new TicketOption()
    ticket_option.event = this.event['id']
    this.ticketOptions.push(ticket_option)
    console.log(this.ticketOptions)
  }

  logTicket(ticket){
    console.log(ticket)
  }

  saveTicketOption(ticketOption: TicketOption){
    if(this.event['id']){
      this.eventService.createTicketOption(ticketOption).subscribe(
        res => {
          console.log(res)
          this.messageService.displayMessage('Ticket created!')
        },
        err => console.log(err),
      )
    }else{
      this.messageService.displayMessage('You Must Save Event Detail Before Saving Tickets')
    }
  }

  editTicketOption(ticketOption: TicketOption){
    if(this.event['id']){
      ticketOption['url'] = new URL("http://www.fanattix.com")
      console.log(ticketOption)
      this.eventService.editTicketOption(ticketOption).subscribe(
        res => {
          console.log(res)
          this.messageService.displayMessage('Ticket Edited!')
        },
        err => console.log(err),
      )
    }else{
      this.messageService.displayMessage('You Must Save Event Detail Before Saving Tickets')
    }
  }

  

}
