import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { EventService } from '../../event.service';
import { MessageService } from '../../message.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { AuthService } from '../../auth.service';
import { UtilitiesService } from '../../utilities.service';

@Component({
  selector: 'app-occurrence-edit',
  templateUrl: './occurrence-edit.component.html',
  styleUrls: ['./occurrence-edit.component.css']
})
export class OccurrenceEditComponent implements OnInit {
  @Input() eventId
  occurrenceForm: FormGroup

  constructor(
    private eventService: EventService, 
    private messageService: MessageService, 
    private fb: FormBuilder,
    private auth: AuthService,
    private util: UtilitiesService
  ) { }

  ngOnInit() {
  }

  initForm(){
    this.occurrenceForm = this.fb.group({
      creator: this.auth._userId.value,
      event: this.eventId,
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: ['', Validators.required],
      endTime: ['', Validators.required]
    })
  }


  submitForm(){

    if(this.eventId){
      let start = this.util.DateAndTimeToDateTime(this.occurrenceForm.get('startDate').value, this.occurrenceForm.get('startTime').value)
      let end = this.util.DateAndTimeToDateTime(this.occurrenceForm.get('endDate').value, this.occurrenceForm.get('endTime').value)
    

      let occurrenceData = {
        creator: this.occurrenceForm.get('creator').value,
        event: this.eventId,
        start: start,
        end: end,
      }
      console.log(this.eventId)
      console.log(occurrenceData)
      console.log(occurrenceData.start)
      console.log(occurrenceData.event)

      this.eventService.editEventOccurrence(occurrenceData).subscribe(
        res => {
          console.log(res)
          this.messageService.displayMessage('Event Date Updated')
        },
        err => console.log('err')
      )
    }else{
      this.messageService.displayMessage('You Must Save Event Details Before Saving Time/Date')
    }
  }

}
