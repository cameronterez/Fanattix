import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { MessageService } from '../../message.service';
import { EventService } from '../../event.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  
  categories = []
  types = []

  selectedFile: ImageSnippet
  selectedFileSource: String
  eventForm: FormGroup

  createdEvent: number

  formErrors = []
  errors = []

  constructor(
    private fb: FormBuilder, 
    private eventService: EventService, 
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private modal: NgbModal
  ) { }

  ngOnInit() {
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

  initBlankForm(){
    this.eventForm = this.fb.group({
      id: '',
      name: '',
      description: '',
      //type: '', 
      type_obj: '',     
      //category: '',
      category_obj: '',
      location: '',
      organizers: '',
      venue: '',
      image: '',
      lat : '',
      lng: '',
      is_inactive: false
    })
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

  createEvent(){
    let data = {
      name: this.eventForm.get('name').value,
      description: this.eventForm.get('description').value,
      //type: this.eventForm.get('type').value,
      type_obj : this.eventForm.get('type_obj').value,
      //category: this.eventForm.get('category').value,
      category_obj: this.eventForm.get('category_obj').value,
      organizers: this.eventForm.get('organizers').value,
      location: this.eventForm.get('location').value,
      venue : this.eventForm.get('venue').value,
      creator: this.authService._userId.value,
      image: this.selectedFileSource,
      lat: this.eventForm.get('lat').value,
      lng: this.eventForm.get('lng').value
    }

    this.eventService.createEvent(data).subscribe(
      res => {
        if(res.hasOwnProperty('errors')){
          this.formErrors = res['errors']
          console.log(res)
          console.log(this.formErrors)
        }else{
          this.messageService.displayMessage(`Event ${data.name} Saved!`)
          console.log(res)
          this.createdEvent = res['event']
          console.log(this.createdEvent)
        }
      },
      err => console.log(err)
    )
  }

}

export class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
