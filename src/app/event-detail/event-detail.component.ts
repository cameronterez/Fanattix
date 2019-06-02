import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FxEvent } from '../models/event';
import { EventService } from '../event.service';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  eventId: String
  event: FxEvent

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService,
  ) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id')
    this.getEventDetail()
  }

  getEventDetail(){
    this.eventService.getEvent(this.eventId).subscribe(
      res => this.event = res,
      err => console.log(err)
    )
  }

  goToPurchase(ticketOptionId){
    this.router.navigate(['purchase-ticket', ticketOptionId])
  }  

}
