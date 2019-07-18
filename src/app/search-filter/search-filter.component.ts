import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { EventService } from '../event.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterServiceService } from '../filter-service.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})

export class SearchFilterComponent implements OnInit {
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  @Output() filtersUpdated = new EventEmitter()
  categories: any
  types: any
  location = {
    lat: null,
    lng: null,
  }

  //filter targets
  selectedCategory: number
  selectedType: number
  selectedPrice: string

  constructor(
    private eventService: EventService, 
    private router: Router, 
    private route: ActivatedRoute,
    private filterService: FilterServiceService
  ) { }

  ngOnInit() {
    this.getCategories()
    this.getTypes()
  }

  public handleAddressChange(address: Address) {
    this.location = {
      'lat': address.geometry.location.lat(),
      'lng': address.geometry.location.lng()
    }
  }

  getCategories(){
    this.eventService.getCategories().subscribe(
      res => this.categories = res,
      err => console.log(err)
    )
  }

  getTypes(){
    this.eventService.getTypes().subscribe(
      res => this.types = res,
      err => console.log(err)
    )
  }

  applyFilters(){
    let qp = {
      lat : this.location.lat,
      lng : this.location.lng,
      category_name : this.selectedCategory,
      type_name : this.selectedType,
      price : this.selectedPrice
    }

    this.router.navigate([], {
      queryParams: qp,
      queryParamsHandling: 'merge',
    });
    console.log('emitted query params')
    
    this.filtersUpdated.emit(qp)
  }

}
