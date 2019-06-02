import { Component, OnInit, OnChanges } from '@angular/core';
import { Input } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnChanges {
  @Input() events

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
