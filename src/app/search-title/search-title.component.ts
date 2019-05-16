import { Component, OnInit } from '@angular/core';
import { FxEvent } from '../models/event';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-search-title',
  templateUrl: './search-title.component.html',
  styleUrls: ['./search-title.component.css']
})
export class SearchTitleComponent implements OnInit {
  results: FxEvent[]

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
  }

  searchEventsByName(ev, eventName){
    ev.preventDefault()
    this.eventService.searchEventsByName(eventName).subscribe(
      res => {
        this.results = res
        console.log(this.results)
      },
      err => console.log(err)
    )
  }  

  goToEventDetail(id){
    this.router.navigate(['event', id])
    console.log('detail')
  }

}
