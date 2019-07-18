import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-horizontal-scroll',
  templateUrl: './event-horizontal-scroll.component.html',
  styleUrls: ['./event-horizontal-scroll.component.css']
})
export class EventHorizontalScrollComponent implements OnInit {
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
