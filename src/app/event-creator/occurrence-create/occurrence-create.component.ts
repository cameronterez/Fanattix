import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UtilitiesService } from '../../utilities.service';
import { AuthService } from '../../auth.service';
import { EventService } from '../../event.service';
import { MessageService } from '../../message.service';
import { FxEventOccurrence } from '../../models/event-occurrence';

@Component({
  selector: 'app-occurrence-create',
  templateUrl: './occurrence-create.component.html',
  styleUrls: ['./occurrence-create.component.css']
})
export class OccurrenceCreateComponent implements OnInit {
  @Input() event
  @Input() eventOccurrenceId
  createdOccurrence: FxEventOccurrence
  occurrenceForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private util: UtilitiesService,
    private auth: AuthService,
    private eventService: EventService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    //this.initForm()
  }

  ngOnChanges(){
    //this.getOccurrence(this.eventOccurrenceId)
    this.initForm()
    console.log('this.createdOccurrence')
    console.log(this.createdOccurrence)
    console.log('this.createdOccurrence DONE')
  }

  initForm(){
    if(this.event){
      if(this.event.occurrences.length > 1){ //If occurence is set, this is an edit
        console.log(this.event.occurrences)

        this.occurrenceForm = this.fb.group({
          creator: this.auth._userId.value,
          event: this.event['id'],
          startDate: [this.event.occurrences[0].start_date, Validators.required],
          startTime: ['Goodbye', Validators.required],
          endDate: [this.event.occurrences[0].end_date, Validators.required],
          endTime: ['tomorrow', Validators.required]
        })
      }else{        
        this.occurrenceForm = this.fb.group({
          creator: this.auth._userId.value,
          event: this.event['id'],
          startDate: ['', Validators.required],
          startTime: ['', Validators.required],
          endDate: ['', Validators.required],
          endTime: ['', Validators.required]
        })
      }
    }
  }

  submitForm(){

    if(this.event){
      let start = this.util.DateAndTimeToDateTime(this.occurrenceForm.get('startDate').value, this.occurrenceForm.get('startTime').value)
      let end = this.util.DateAndTimeToDateTime(this.occurrenceForm.get('endDate').value, this.occurrenceForm.get('endTime').value)
    

      let occurrenceData = {
        id : this.eventOccurrenceId,
        creator: this.occurrenceForm.get('creator').value,
        event: this.event['id'],
        start: start,
        end: end,
      }
      console.log(this.event['id'])
      console.log(occurrenceData)
      console.log(occurrenceData.start)
      console.log(occurrenceData.event)

      if(this.createdOccurrence){  //If this is an edit created occurrence will be set, so edit
        this.eventService.editEventOccurrence(occurrenceData).subscribe(
          res => console.log(res),
          err => console.log(err)
        )
      }else{ //If not set, then create new occurrence
        this.eventService.createEventOccurrence(occurrenceData).subscribe(
          res => {
            console.log(res)
            this.createdOccurrence = res
            this.messageService.displayMessage('Date/Time Saved')
          },
          err => console.log(err)
        )
      }

    }else{
      this.messageService.displayMessage('You Must Save Event Details Before Saving Time/Date')
    }
  }

  getOccurrence(id){
    this.eventService.getOccurrence(id).subscribe(
      res => this.createdOccurrence = res['occurrence'],
      err => console.log(err)
    )
  }

}
