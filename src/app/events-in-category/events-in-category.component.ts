import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { FxEvent } from '../models/event';

@Component({
  selector: 'app-events-in-category',
  templateUrl: './events-in-category.component.html',
  styleUrls: ['./events-in-category.component.css']
})
export class EventsInCategoryComponent implements OnInit {
  events: FxEvent[]

  constructor(private eventService: EventService) { }

  ngOnInit() {
  }

  getPopularEvents(){
    this.eventService.getEvents().subscribe(
      res => {
        console.log(res)
        this.events = res
      },
      err => console.log(err)
    )
  }

}
