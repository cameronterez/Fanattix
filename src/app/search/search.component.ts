import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FxEvent } from '../models/event';
import { EventService } from '../event.service';
import { Router } from '@angular/router';
import { API_URL, IMAGE_URL } from '../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  results: FxEvent[]
  IMAGE_URL = IMAGE_URL

  constructor(private http: HttpClient, private eventService: EventService, private router: Router) { }

  ngOnInit() {
  }

  searchName(search){
    console.log(search)
    this.searchEventsByName(search)
  }

  searchEventsByName(eventName){
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
