import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-near-events',
  templateUrl: './near-events.component.html',
  styleUrls: ['./near-events.component.css']
})
export class NearEventsComponent implements OnInit {
  @Input() events

  constructor() { }

  ngOnInit() {
  }

}
