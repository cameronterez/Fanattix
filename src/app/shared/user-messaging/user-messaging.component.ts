import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-messaging',
  templateUrl: './user-messaging.component.html',
  styleUrls: ['./user-messaging.component.css']
})
export class UserMessagingComponent implements OnInit {
  messages = [
    { 
      content: 'Message Testing',
      type: 'info'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
