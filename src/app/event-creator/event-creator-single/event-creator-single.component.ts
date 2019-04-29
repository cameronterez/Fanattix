import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { EventService } from '../../event.service';
import { MessageService } from '../../message.service';
import { FxEvent } from '../../models/event';

@Component({
  selector: 'app-event-creator-single',
  templateUrl: './event-creator-single.component.html',
  styleUrls: ['./event-creator-single.component.css']
})
export class EventCreatorSingleComponent implements OnInit {

  selectedFile: ImageSnippet
  eventForm: FormGroup
  createdEventId: Number

  constructor(private fb: FormBuilder, private eventService: EventService, private messageService: MessageService) { }

  ngOnInit() {
    this.initForm()
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      /*this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
        
        },
        (err) => {
        
        })*/
    });

    reader.readAsDataURL(file);
  }

  initForm(){
    this.eventForm = this.fb.group({
      id: 4,
      name: "International Boxers' With message",
      description: 'This is a test Description',
      type: 'other',      
      category: 'other',
      location: '1111 Lower Fayetteville Road, Newnan, Ga 30265',
      venue: 'Publix',
      creator: 1,
      date: new Date('December 17, 1995 03:24:00')
    })
  }

  createEvent(){
    let data = {
      name: this.eventForm.get('name').value,
      description: this.eventForm.get('description').value,
      type: this.eventForm.get('type').value,
      category: this.eventForm.get('category').value,
      location: this.eventForm.get('location').value,
      venue : this.eventForm.get('venue').value,
      creator: this.eventForm.get('creator').value,
    }

    this.eventService.createEvent(data).subscribe(
      res => {
        this.messageService.displayMessage(`Event ${data.name} Created! Now, add some Tickets.`)
        //console.log(res)
        this.createdEventId = res['event']['id']
        console.log(this.createdEventId)
      },
      err => console.log(err)
    )
  }


}

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
