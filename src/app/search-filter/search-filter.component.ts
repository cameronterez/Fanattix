import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
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
  @Input() selectedFilters
  categories: any
  types: any
  location = {
    lat: null,
    lng: null,
    locationString: null
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
    this.applySelectedFilters()
  }

  public handleAddressChange(address: Address) {
    this.location = {
      'lat': address.geometry.location.lat(),
      'lng': address.geometry.location.lng(),
      'locationString': address.formatted_address
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

  applySelectedFilters(){
    //recieves previously filters from search-title component after refresh
    this.selectedCategory = this.selectedFilters['category_name']
    this.selectedType = this.selectedFilters['type_name']
    this.selectedPrice = this.selectedFilters['price']
    this.location.locationString = this.selectedFilters['locationString']
    this.location.lat = this.selectedFilters['lat'],
    this.location.lng = this.selectedFilters['lng']
  }

  applyFilters(){
    //applies new filters selected
    let qp = {
      lat : this.location.lat,
      lng : this.location.lng,
      locationString : this.location.locationString,
      category_name : this.selectedCategory,
      type_name : this.selectedType,
      price : this.selectedPrice,
    }

    this.router.navigate([], {
      queryParams: qp,
      queryParamsHandling: 'merge',
    });
    console.log('emitted query params')
    
    this.filtersUpdated.emit(qp)
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
