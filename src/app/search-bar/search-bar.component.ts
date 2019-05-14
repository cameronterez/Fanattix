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

  constructor(private eventService: EventService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initSearchForm()
    this.getCategories()
  }

  getCategories(){
    this.eventService.getCategories().subscribe(
      res => this.categories = res,
      err => console.log(err)
    )
  }

  valueChanged($event, name){
    $event.preventDefault()
    console.log('name')    
    this.valueChange.emit(name)
  }

  searchEvents($event, location, category, date){
    $event.preventDefault()
    console.log('the search')
    let search = {
      location: location,
      category: category,
      date: date
    }
    
    this.cldvalue.emit(search)
  }

  initSearchForm(){
    this.searchForm = this.fb.group({
      category: '',
      location: '',
      lat: '',
      lng: '',
      date: ''
    })
  }

  handleAddressChange(address: Address){
    this.searchForm.get('location').setValue(address.formatted_address)
    this.searchForm.get('lat').setValue(address.geometry.location.lat())
    this.searchForm.get('lng').setValue(address.geometry.location.lng()) 
  }

  searchCLD(){
    let data = this.searchForm.value
    this.eventService.searchEvents(data).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

}
