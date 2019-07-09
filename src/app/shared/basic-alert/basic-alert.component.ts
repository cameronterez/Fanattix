import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { MessageService } from '../../message.service';


@Component({
  selector: 'app-basic-alert',
  templateUrl: './basic-alert.component.html',
  styleUrls: ['./basic-alert.component.css']
})
export class BasicAlertComponent implements OnInit {

  constructor(private messageService: MessageService){}

  /*private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage: string;*/

  public successMessage

  ngOnInit(): void {
   this.messageService._message.subscribe(
      val => this.successMessage = val,
      err => this.successMessage = err
    )
  }

  public changeSuccessMessage() {
    this.successMessage = ''
  }

  
  
}
