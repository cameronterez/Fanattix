import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../event.service';


@Component({
  selector: 'app-event-tickets',
  templateUrl: './event-tickets.component.html',
  styleUrls: ['./event-tickets.component.css']
})
export class EventTicketsComponent implements OnInit {
  event
  eventId

  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit() {
    this.route.params.subscribe(
      val => {
        this.eventId = val['id']
        this.getEvent(this.eventId)
      },
      err => console.log(err)
    )
  }

  getEvent(id){
    this.eventService.getEvent(id).subscribe(
      res => {
        this.event = res
        console.log(this.event)
      },
      err => console.log(err)
    )
  }

}
