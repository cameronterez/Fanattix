import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute} from '@angular/router';
import { EventService } from '../../event.service';
import { IMAGE_URL } from '../../../environments/environment';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  events
  IMAGE_URL = IMAGE_URL

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
    this.getMyEvents()
    console.log(IMAGE_URL)
  }

  getMyEvents(){
    this.eventService.getMyEvents().subscribe(
      res => {
        this.events = res
        console.log(res)
      },
      err => console.log(err)
    )
  }

  goToDetail(id){
    this.router.navigate(['event', id])
  }

  goToEdit(id){
    this.router.navigate(['creator/edit-event', id])
  }

  goToActions(id){
    this.router.navigate(['creator/actions', id])
  }

  goToTickets(id){
    this.router.navigate(['creator/event-tickets', id])
  }

}
