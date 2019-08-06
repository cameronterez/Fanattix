import { Component, OnInit } from '@angular/core';
import { FxEvent } from '../models/event';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { FilterServiceService } from '../filter-service.service';

@Component({
  selector: 'app-search-title',
  templateUrl: './search-title.component.html',
  styleUrls: ['./search-title.component.css']
})
export class SearchTitleComponent implements OnInit {
  results: any
  queryString = 'hello'
  initialParams = {}

  constructor(
    private eventService: EventService, 
    private router: Router, 
    private route: ActivatedRoute,
    private filterService: FilterServiceService
  ) { }

  ngOnInit() {
    this.initWithQueryParams()
  }

  searchEventsByName(ev, eventName){
    ev.preventDefault()
    this.updateQueryParams(eventName)
  }  

  goToEventDetail(id){
    this.router.navigate(['event', id])
    console.log('detail')
  }

  initWithQueryParams(){
    //initializes previous search state from query params
    this.queryString = this.route.snapshot.queryParamMap.get('searchTerm')

    let params = {
      lat : parseFloat(this.route.snapshot.queryParamMap.get('lat')),
      lng : parseFloat(this.route.snapshot.queryParamMap.get('lng')),
      locationString : this.route.snapshot.queryParamMap.get('locationString'),
      category_name : this.route.snapshot.queryParamMap.get('category_name'),
      type_name : this.route.snapshot.queryParamMap.get('type_name'),
      price : this.route.snapshot.queryParamMap.get('price'),
      searchTerm : this.route.snapshot.queryParamMap.get('searchTerm'),
    }
    
    this.initialParams = params
    console.log(params)    
    this.filter(params)
  }

  async updateQueryParams(eventName){
    await this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          searchTerm: eventName,
      },
      queryParamsHandling: 'merge',
    })

    this.route.queryParams.subscribe(
      val => {
        this.filter(val)
        console.log(val)
      },
      err => console.log(err)
    )    
  }

  filter(queryParams){
    console.log(queryParams)
    if(this.route.snapshot.paramMap.has('searchTerm')){
      queryParams['searchTerm'] = this.route.snapshot.paramMap.get('searchTerm')
    }
    this.filterService.filter(queryParams).subscribe(
      res => {
        console.log(res)
        this.results = res
      },
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
