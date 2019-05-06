import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EventService } from '../event.service';
import { FxEvent } from '../models/event';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() valueChange = new EventEmitter()

  constructor(private eventService: EventService) { }

  ngOnInit() {
  }

  valueChanged($event, name){
    $event.preventDefault()
    console.log('name')    
    this.valueChange.emit(name)
  }

  /*searchEvents($event, location, category, date){
    $event.preventDefault()
    console.log('the search')
    let search = {
      location: location,
      category: category,
      date: date
    }
    
    this.searchChanged.emit(search)
  }*/

}
