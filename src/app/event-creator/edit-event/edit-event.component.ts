import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../auth.service';
import { EventService } from '../../event.service';
import { FxEvent } from '../../models/event';
import { isNullOrUndefined } from 'util';
import { ImageSnippet } from '../event-creator-single/event-creator-single.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDeleteModalComponent } from '../modals/event-delete-modal/event-delete-modal.component';


@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  categories = []
  types = []

  eventId: String
  event: FxEvent
  editForm: FormGroup
  selectedFile: ImageSnippet
  selectedFileSource: String

  errors = []
  formErrors = []

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private fb: FormBuilder,
    private authService: AuthService,
    private modal: NgbModal,
    private router: Router
  ) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id')

    this.eventService.getCategories().subscribe(
      res => {
        this.categories = res},
      err => console.log(err)
    )

    this.eventService.getTypes().subscribe(
      res => {
        this.types = res},
      err => console.log(err)
    )

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
      id: this.event.id,
      name: this.event.name,
      description: this.event.description,
      //type: 'other',      
      //category: 'other',
      location: this.event.location,
      venue: 'Publix',
      creator: this.authService._userId.value,
      image: this.selectedFileSource ? this.selectedFileSource : '', //this.selectedFileSource,
      date: new Date('December 17, 1995 03:24:00'),
      is_inactive: this.event.is_inactive,
      type_obj: this.event.type_obj,
      category_obj: this.event.category_obj,
      organizers: this.event.organizers
    })

    console.log(this.editForm.value)
  }

  editEvent(eventId){
    this.eventService.editEvent(eventId, this.editForm.value).subscribe(
      res => {
        console.log(res)
      },
      err => console.log(err)
    )
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.selectedFileSource = this.selectedFile.src
    });

    reader.readAsDataURL(file);
  }

  deleteEvent(){
    let confirmVal = confirm(`Are You Sure You want to Delete Event '${this.event.name}'?`)

    if(confirmVal == true){
      this.eventService.deleteEvent(this.event.id).subscribe(
        res => {console.log(res)},
        err => console.log(err)
      )
      this.router.navigate(['creator/my-events'])
    }else{
      return false
    }

  }

}
