import { Component, OnInit, Input, EventEmitter } from '@angular/core';
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
  @Input() createdTicketOptions: TicketOption[]
  ticketOptions: TicketOption[] = []
  errors = []
  formErrors = []
  fees

  constructor(private eventService: EventService, private messageService: MessageService) { }

  ngOnInit(){
    this.eventService.getFees().subscribe(
      res => {
        console.log(res)
        this.fees = res
      },
      err => console.log(err)
    )

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

  saveTicketOption($event, ticketOption: TicketOption){
    let valid = this.validateTicketOption(ticketOption)
    console.log(valid)
    console.log(ticketOption)

    if(valid){

      if(this.event['id']){
        this.eventService.createTicketOption(ticketOption).subscribe(
          res => {
            if(res.hasOwnProperty('errors')){
              this.formErrors = res['errors']
              console.log(res)
              console.log(this.formErrors)
            }else{
              console.log(res)
              this.messageService.displayMessage('Ticket created!')
              console.log($event)
              /*let button = $event.target as HTMLInputElement
              button.value = 'Saved'
              button.innerHTML = 'Saved'
              button.innerText = 'Saved'
              button.disabled = true*/
              //$event.srcElement.color = 'white'
              //$event.srcElement.css.backgroundColor = 'forestGreen'
              let parent = $event.target.closest('.new-tickets') as HTMLDivElement
              parent.classList.add('saved')
              parent.style.display = 'none'
              this.event['ticket_options'].push(res)
            }
          },
          err => {
            console.log(err)
            if(err.hasOwnProperty('error')){
              this.formErrors = err['error']
            }
          },
        )
      }else{
        this.messageService.displayMessage('You Must Save Event Detail Before Saving Tickets')
      }

    }
  }

  editTicketOption(ticketOption: TicketOption){
    let valid = this.validateTicketOption(ticketOption)
    console.log(valid)

    if(valid){

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

  validateTicketOption(ticketOption: TicketOption){
    console.log('lego')
    if(ticketOption.hasOwnProperty('event') && ticketOption.name != null && ticketOption.name != undefined && ticketOption.name != ''){      
      console.log('first_ran')
      if(ticketOption.hasOwnProperty('price') && ticketOption.price != null && ticketOption.price != undefined){        
        return true
      }else{
        this.formErrors['price'] = 'You must enter a ticket price'
        return false
      }
      
    }else{
      this.formErrors['name'] = 'You must enter a name'
      return false
    }    
  }

  deleteTicket(ticketOption){
    let confirmVal = confirm(`Are you sure you want to delete Ticket "${ticketOption.name}"`)

    if(confirmVal == true){
      this.eventService.deleteTicketOption(ticketOption['id']).subscribe(
        res => {
          console.log(res)

          let to = this.event['ticket_options'].find(to =>{ 
              to.id == ticketOption.id
            }
          )
          
          this.event['ticket_options'].splice(this.event['ticket_options'].indexOf(ticketOption), 1)
        },
        err => console.log(err)
      )
    }else{
      return false
    }
  }

}
