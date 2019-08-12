import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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
  formErrors = []
  errors = []
  @Output() validEmitter = new EventEmitter()

  constructor(
    private fb: FormBuilder,
    private util: UtilitiesService,
    private auth: AuthService,
    private eventService: EventService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.initForm()
  }

  ngOnChanges(){
    //this.getOccurrence(this.eventOccurrenceId)
    this.initForm()
    console.log(this.createdOccurrence)
  }

  initForm(){
    //if(this.event){
      if(this.event != undefined && this.event.hasOwnProperty('occurrences') && this.event.occurrences.length > 0){ //If occurence is set, this is an edit
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
          event: this.event == undefined ? undefined : this.event['id'],
          startDate: ['', Validators.required],
          startTime: ['', Validators.required],
          endDate: ['', Validators.required],
          endTime: ['', Validators.required]
        })
      }

      console.log(this.occurrenceForm)
    //}
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

      if(this.createdOccurrence){  //If this is an edit created occurrence will be set, so edit
        this.eventService.editEventOccurrence(occurrenceData).subscribe(
          res => {
            console.log(res)
            this.validEmitter.emit('true')
          },
          err => console.log(err)
        )
      }else{//If not set, then create new occurrence
        this.eventService.createEventOccurrence(occurrenceData).subscribe(
          res => {
            if(res.hasOwnProperty('errors')){
              this.formErrors = res['errors']
              console.log(res)
              console.log(this.formErrors)
              this.validEmitter.emit('false')
            }else{
              console.log(res)
              this.createdOccurrence = res
              this.messageService.displayMessage({content:'Date/Time Saved', type: 'success'})
              this.validEmitter.emit('true')
            }
          },
          err => {
            console.log(err)
            this.messageService.displayMessage({content:'Please Ensure All Fields Are Completed', type: 'error'})
            if(err.hasOwnProperty('error')){
              this.formErrors = err['error']
              console.log(err)
              console.log(this.formErrors)
              this.validEmitter.emit('false')
            }
          }
        )
      }

    }else{
      this.messageService.displayMessage({content:'You Must Save Event Details Before Saving Time/Date', type: 'error'})
    }
  }

  getOccurrence(id){
    this.eventService.getOccurrence(id).subscribe(
      res => this.createdOccurrence = res['occurrence'],
      err => console.log(err)
    )
  }

}
