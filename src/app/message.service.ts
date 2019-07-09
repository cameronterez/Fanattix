import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  _message = new BehaviorSubject({})

  constructor() { }

  displayMessage(msg){
    this._message.next(msg)
    //setTimeout(function(){ this._message.next('')}.bind(this), 5000)
  }
}
