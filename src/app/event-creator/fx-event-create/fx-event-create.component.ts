import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { EventService } from '../../event.service';
import { MessageService } from '../../message.service';
import { FxEvent } from '../../models/event';
import { Input } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventDeleteModalComponent } from '../modals/event-delete-modal/event-delete-modal.component';
import { UtilitiesService } from '../../utilities.service';

@Component({
  selector: 'app-fx-event-create',
  templateUrl: './fx-event-create.component.html',
  styleUrls: ['./fx-event-create.component.css']
})
export class FxEventCreateComponent implements OnInit {
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  
  @Input() passedEvent
  selectedFile: ImageSnippet
  selectedFileSource: String
  eventForm: FormGroup
  createdEvent: FxEvent
  categories: any[]
  types: any[]
  formErrors = []
  errors = []

  //Validation of Occurrence and Tickets
  occurrenceValid = false
  
  //Occurrences
  occurrenceForm


  constructor(
    private fb: FormBuilder, 
    private eventService: EventService, 
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private modal: NgbModal,
    private util: UtilitiesService
  ) { }

  ngOnInit() {
    if(!this.passedEvent){ //this only runs if passedEvent is NOT set, which makes this a new Event
      this.initForm()
    }

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
  }

  ngOnChanges(){
    if(this.passedEvent){ //this runs only if event is passedEvent is set which makes this an edit
      this.createdEvent = this.passedEvent 
      console.log(this.passedEvent)
      this.initForm() //init form here to wait for event
    }
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

  public handleAddressChange(address: Address) {
    //console.log(address)
    this.eventForm.get('location').setValue(address.formatted_address)
    this.eventForm.get('lat').setValue(address.geometry.location.lat())
    this.eventForm.get('lng').setValue(address.geometry.location.lng())
    //console.log(address.geometry.location.lat())
    //console.log(address.geometry.location.lng())
  }

  initForm(){
    this.eventForm = this.fb.group({
      id: '',
      name: '',
      description: '',
      type_obj: '',     
      category_obj: '',
      location: '',
      organizers: '',
      venue: '',
      image: '',
      lat : '',
      lng: '',
      is_inactive: false
    })

    this.occurrenceForm = this.fb.group({
      creator: 1,
      event: undefined,
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: ['', Validators.required],
      endTime: ['', Validators.required]
    })
  }

  createEvent(){
    if(this.eventForm.valid && this.occurrenceForm.valid){
      let data = {
        name: this.eventForm.get('name').value,
        description: this.eventForm.get('description').value,
        type_obj : this.eventForm.get('type_obj').value,
        category_obj: this.eventForm.get('category_obj').value,
        organizers: this.eventForm.get('organizers').value,
        location: this.eventForm.get('location').value,
        venue : this.eventForm.get('venue').value,
        creator: this.authService._userId.value,
        image: this.selectedFileSource,
        lat: this.eventForm.get('lat').value,
        lng: this.eventForm.get('lng').value
      }

      this.prepareEventData(data)

      console.log(data)
        this.eventService.createEvent(data).subscribe(
          res => {
            if(res.hasOwnProperty('errors')){
              this.formErrors = res['errors']
              console.log(res)
              console.log(this.formErrors)
            }else{
              this.messageService.displayMessage({content:`Event ${data.name} Saved!`, type: 'success'})
              console.log(res)
              this.createdEvent = res['event']
              this.router.navigate(['creator/post-create', this.createdEvent['id']])
              console.log(this.createdEvent)
            }
          },
          err => console.log(err)
        )
      }
  }

  deleteEvent(){
    this.eventService.deleteEvent(this.createdEvent['id']).subscribe(
      res => {
        console.log(res)
        this.messageService.displayMessage({content:`Event Deleted`, type: 'success'})
        this.router.navigate(['creator/my-events'])
      }
    )

  }

  confirmDelete(){
    this.modal.open(EventDeleteModalComponent)
  }

  setOccurrenceValid(value){
    let bool = (value == 'true') //converts string to boolean
    this.occurrenceValid = bool
    console.log(value)
  }

  scrollToElement(el){
    this.util.scrollToElement(el)
  }

  prepareEventData(eventData){
    if(this.occurrenceForm.valid){
      let start = this.util.DateAndTimeToDateTime(this.occurrenceForm.get('startDate').value, this.occurrenceForm.get('startTime').value)
      let end = this.util.DateAndTimeToDateTime(this.occurrenceForm.get('endDate').value, this.occurrenceForm.get('endTime').value)
      

      let occurrenceData = {
        creator: this.occurrenceForm.get('creator').value,
        event: undefined,
        start: start,
        end: end,
      }
      //add occurrence to event
      eventData['occurrence'] = occurrenceData

      }
  }

}

export class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

