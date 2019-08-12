import { Component, OnInit, OnChanges } from '@angular/core';
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
  @Input() event
  occurrenceForm: FormGroup

  constructor(
    private eventService: EventService, 
    private messageService: MessageService, 
    private fb: FormBuilder,
    private auth: AuthService,
    private util: UtilitiesService
  ) { }

  ngOnInit() {
    console.log(` the event is ${this.event.occurrences}`)
    this.initForm()    
  }

  initForm(){
      let startDate = this.util.DateTimeToDateAndTime(this.event.occurrences[0].start)
      let endDate = this.util.DateTimeToDateAndTime(this.event.occurrences[0].end)

      console.log(startDate)
      console.log(endDate)

      this.occurrenceForm = this.fb.group({
        creator: this.auth._userId.value,
        event: this.event.id,
        startDate: [ startDate[0], Validators.required],
        startTime: [ startDate[1], Validators.required],
        endDate: [ endDate[0], Validators.required],
        endTime: [ endDate[1], Validators.required]
      })
    
    console.log(this.event)
  }


  submitForm(){

    if(this.event.id){
      let start = this.util.DateAndTimeToDateTime(this.occurrenceForm.get('startDate').value, this.occurrenceForm.get('startTime').value)
      let end = this.util.DateAndTimeToDateTime(this.occurrenceForm.get('endDate').value, this.occurrenceForm.get('endTime').value)
      
      console.log(start)
      console.log(end)

      let occurrenceData = {
        id: this.event.occurrences[0]['id'],
        creator: this.occurrenceForm.get('creator').value,
        event: this.event.id,
        start: start,
        end: end,
      }
      console.log(this.event.id)
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
