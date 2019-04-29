import { Component, OnInit } from '@angular/core';
import { EventService } from '../../event.service';
import { FxEvent } from '../../models/event';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events: FxEvent[]

  constructor(
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getEvents()
  }

  getEvents(){
    this.eventService.getEvents().subscribe(
      res => this.events = res,
      err => console.log(err)
    )
  }

  goToEventDetail(id){
    this.router.navigate(['event', id])
    console.log('detail')
  }

}
