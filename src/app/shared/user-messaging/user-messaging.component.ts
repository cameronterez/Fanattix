import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-user-messaging',
  templateUrl: './user-messaging.component.html',
  styleUrls: ['./user-messaging.component.css']
})
export class UserMessagingComponent implements OnInit {
  messages = [
    /*{ 
      content: 'Message Testing',
      type: 'info'
    },
    { 
      content: 'Error Testing',
      type: 'error'
    },
    { 
      content: 'Success Testing',
      type: 'success'
    },*/
  ]

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService._message.subscribe(
      val => this.displayMessage(val),
      err => console.log(err)
    )
  }

  displayMessage(message){
   this.messages.push(message)
   setTimeout(function(){this.clearMessage(message)}.bind(this), 5000)
  }

  clearMessage(message){
    this.messages.splice(this.messages.indexOf(message), 1)
  }

}
