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
  search = 'title'

  constructor(private http: HttpClient, private eventService: EventService, private router: Router) { }

  ngOnInit() {
  }

  searchName(search){
    console.log(search)
    if(search['category'] == undefined){       
      this.searchEventsByName(search) //if category is undefined, this is a name search
    }else{
    this.searchCLD(search) 
    } //if there is any category, this is a CLD search
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

  changeSearch(val){
    this.search = val
  }

  searchCLD(searchObj){
    let data = searchObj
    console.log(data)
    this.eventService.searchEvents(data).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

  toggleSlide(){
    // Implement slider
    console.log('toggle slide')
    let slider = document.getElementById('filters-panel')
    if(slider.classList.contains('closed')){
      slider.classList.remove('closed')
    }else{
      slider.classList.add('closed')
    }
  }

}
