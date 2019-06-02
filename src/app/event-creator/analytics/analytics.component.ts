import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { EventService } from '../../event.service';
import { MessageService } from '../../message.service';
import { FxEvent } from '../../models/event';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  eventId: string
  event: FxEvent

  constructor(
    private route: ActivatedRoute, 
    private authService: AuthService,
    private eventService: EventService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id')
    this.getEvent()
  }

  getEvent(){
    this.eventService.getEvent(this.eventId).subscribe(
      res => {
        this.event = res
        console.log(this.event)
      },
      err => {
        console.log(err)
        this.messageService.displayMessage('Could Not Load Event Data')
      }
    )
  }

  goToEdit(id){
    this.router.navigate(['creator/edit-event', id])
  }

}
