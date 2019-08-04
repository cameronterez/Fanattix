import { Component, OnInit, Input } from '@angular/core';
import { TicketOption } from '../../models/ticket-option';
import { EventService } from '../../event.service';
import { MessageService } from '../../message.service';
import { EventDeleteModalComponent } from '../modals/event-delete-modal/event-delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-ticket-option',
  templateUrl: './edit-ticket-option.component.html',
  styleUrls: ['./edit-ticket-option.component.css']
})
export class EditTicketOptionComponent implements OnInit {
  @Input() event
  createdTicketOptions: TicketOption[]
  ticketOptions: TicketOption[] = []

  constructor(private eventService: EventService, private messageService: MessageService, private modal: NgbModal) { }

  ngOnInit(){
    try{
      this.createdTicketOptions = this.event.ticket_options
    }catch{
      console.log('no ticket options')
    }
  }

  addTicketOption(){
    if(this.event){
      let ticket_option = new TicketOption()
      ticket_option.event = this.event['id']
      this.ticketOptions.push(ticket_option)
      console.log(this.ticketOptions)
    }else{
      this.messageService.displayMessage('Please Create & Save Your event Before Adding Tickets')
    }
  }

  logTicket(ticket){
    console.log(ticket)
  }

  saveTicketOption(ticketOption: TicketOption){
    if(this.event['id']){
      this.eventService.editTicketOption(ticketOption).subscribe(
        res => {
          console.log(res)
          this.messageService.displayMessage('Ticket created!')
        },
        err => {
          console.log(err)
          this.messageService.displayMessage('An Error Occured, Please Try Again')
        },
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

  confirmDelete(){
    this.modal.open(EventDeleteModalComponent)
  }

  

}