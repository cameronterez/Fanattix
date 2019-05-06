import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UtilitiesService } from '../../utilities.service';
import { AuthService } from '../../auth.service';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-occurrence-create',
  templateUrl: './occurrence-create.component.html',
  styleUrls: ['./occurrence-create.component.css']
})
export class OccurrenceCreateComponent implements OnInit {
  @Input() eventId
  occurrenceForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private util: UtilitiesService,
    private auth: AuthService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.initForm()
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

    this.eventService.createEventOccurrence(occurrenceData).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }
}
