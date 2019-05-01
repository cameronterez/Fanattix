import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../auth.service';
import { EventService } from '../../event.service';
import { FxEvent } from '../../models/event';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  eventId: String
  event: FxEvent
  editForm: FormGroup

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id')
    this.getEvent()
  }

  getEvent(){
    this.eventService.getEvent(this.eventId).subscribe(
      res => {
        console.log(res)
        this.event = res 
        this.initEditForm()       
      },
      err => console.log(err)
    )
  }

  initEditForm(){
    this.editForm = this.fb.group({
      id: 4,
      name: this.event.name,
      description: this.event.description,
      type: 'other',      
      category: 'other',
      location: this.event.location,
      venue: 'Publix',
      creator: this.authService._userId.value,
      image: '',//this.selectedFileSource,
      date: new Date('December 17, 1995 03:24:00')
      
    })
  }

  editEvent(eventId){

    let eventData = {
      name: this.editForm.get('name').value,
      description: this.editForm.get('description').value,
      type: this.editForm.get('type').value,
      category: this.editForm.get('category').value,
      location: this.editForm.get('location').value,
      venue : this.editForm.get('venue').value,
      creator: this.editForm.get('creator').value,
      image: null
    }

    this.eventService.editEvent(eventId, eventData).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

}
