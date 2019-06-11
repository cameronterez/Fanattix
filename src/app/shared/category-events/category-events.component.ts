import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../message.service';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-category-events',
  templateUrl: './category-events.component.html',
  styleUrls: ['./category-events.component.css']
})
export class CategoryEventsComponent implements OnInit {
  eventId: number
  events: any

  constructor(
    private route: ActivatedRoute, 
    private messageService: MessageService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      val => {
        console.log(val['params']['id'])
        this.eventId = val['params']['id']
        this.getEventsByCategory(this.eventId)
      },
      err => this.messageService.displayMessage('Could Not Load Events. Please Try Again'),
    )
  }

  getEventsByCategory(id){
    this.eventService.getEventsByCategory(id).subscribe(
      res => this.events = res['events'],
      err => console.log(err)
    )
  }

}
