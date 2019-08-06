import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {IMAGE_URL} from '../../environments/environment';

@Component({
  selector: 'app-event-list-nested',
  templateUrl: './event-list-nested.component.html',
  styleUrls: ['./event-list-nested.component.css']
})
export class EventListNestedComponent implements OnInit {
  @Input() events
  IMAGE_URL = IMAGE_URL

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges(){
    console.log(this.events)
  }

  goToEventDetail(id){
    this.router.navigate(['event', id])
  }

}
