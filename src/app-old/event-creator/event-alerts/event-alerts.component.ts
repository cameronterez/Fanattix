import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../event.service';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-event-alerts',
  templateUrl: './event-alerts.component.html',
  styleUrls: ['./event-alerts.component.css']
})
export class EventAlertsComponent implements OnInit {
  messageForm: FormGroup
  @Input() eventId

  constructor(private fb: FormBuilder, private eventService: EventService, private messageService: MessageService) { }

  ngOnInit() {
    this.initForm()
  }

  initForm(){
    this.messageForm = this.fb.group({
      message: ['', Validators.required],
      event_id: this.eventId,
      subject: ['', Validators.required],
      //Need to get sender email either here or in service
    })
  }

  sendEmailToPatrons(){
    let content = this.messageForm.value
    console.log(content)
    this.eventService.sendEmailToPatrons(content).subscribe(
      res => {
        console.log(res)
        this.messageService.displayMessage("Message Sent!")
      },
      err => console.log(err)
    )
  }

}
