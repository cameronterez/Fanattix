import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventService } from '../../event.service';
import { FxEvent } from '../../models/event';
import { Router } from '@angular/router';
import { MessageService } from '../../message.service';
import { UtilitiesService } from '../../utilities.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events: FxEvent[]
  @ViewChild('eventResults') eventResults: ElementRef

  constructor(
    private eventService: EventService,
    private router: Router,
    private messageService: MessageService,
    private util: UtilitiesService
  ) { }

  ngOnInit() {
    this.getEvents()
  }

  getEvents(element=null){
    console.log(element)
    this.util.scrollToElement(element)    
    this.eventService.getEvents().subscribe(
      res => this.events = res,
      err => console.log(err)
    )
  }

  getFreeEvents(element){
    this.util.scrollToElement(element)
    this.eventService.getFreeEvents().subscribe(
      res => {
        this.events = res
      },
      err => {
        console.log(err)
        this.messageService.displayMessage('Could Not Load Events')
      }
    )
  }

  goToEventDetail(id){
    this.router.navigate(['event', id])
  }

  goToEventCreator(){
    this.router.navigate(['creator'])
  }

}
