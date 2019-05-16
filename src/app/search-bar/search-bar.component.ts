import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EventService } from '../event.service';
import { FxEvent } from '../models/event';
import { FormGroup, Validators, FormBuilder } from '@angular/forms'
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { CategoryObject } from '../models/category-object';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() valueChange = new EventEmitter()
  @Output() cldvalue = new EventEmitter()
  searchForm: FormGroup
  categories: CategoryObject[]
  results: FxEvent[]
  dates: any

  constructor(private eventService: EventService, private fb: FormBuilder) { }

  ngOnInit() {
    this.setDates()
    this.initSearchForm()
    this.getCategories()
  }

  getCategories(){
    this.eventService.getCategories().subscribe(
      res => this.categories = res,
      err => console.log(err)
    )
  }
  initSearchForm(){
    this.searchForm = this.fb.group({
      category: '',
      location: '',
      lat: '',
      lng: '',
      date: 'any'
    })
  }

  handleAddressChange(address: Address){
    this.searchForm.get('location').setValue(address.formatted_address)
    this.searchForm.get('lat').setValue(address.geometry.location.lat())
    this.searchForm.get('lng').setValue(address.geometry.location.lng()) 
  }

  setDate(selection){
    console.log('select')
    var dateObj = new Date()
    let date = new Date()
    switch(selection){
      case 'any':
        date = null
        break
      case 'today': 
        date = dateObj // leave date as is, which represents today 
        console.log(date)
        break
      case 'tomorrow':
        date.setDate(dateObj.getDate()+1); //add 1 to .getDate() makes tomorrow
        console.log(date)
        break
      case 'thisWeek':
        //var curr = new Date; // get current date
        var first = dateObj.getDate() - dateObj.getDay(); // First day is the day of the month - the day of the week
        var last = first + 6; // last day is the first day + 6
        
        //var firstday = new Date(curr.setDate(first)).toUTCString();
        date = new Date(dateObj.setDate(last));
        console.log(date)
        break
      case 'thisMonth':
        date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        console.log(date)
        break
    }

    //this.searchForm.setValue(date)
    
  }

  setDates(){
    let dateObj = new Date()
    this.dates = [
      {
        name: 'today',
        value: dateObj.toISOString(),
      },
      {
        name: 'tomorrow',
        value: new Date(dateObj.setDate(dateObj.getDate()+1)).toISOString(),
      },
      {
        name: 'thisMonth',
        value: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString()
      }
    ]

    console.log(this.dates)
  }

  searchCLD($event){
    let data = this.searchForm.value
    console.log(data)
    //this.cldvalue.emit(data)
    this.eventService.searchEvents(data).subscribe(
      res => {
        console.log(res)
        this.results = res
      },
      err => console.log(err)
    )
  }

}
