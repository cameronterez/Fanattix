import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'fanattix';

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ){}

  ngOnInit(){
    navigator.geolocation.getCurrentPosition(
      loc => {
        this.authService.location = loc
        console.log(loc)
      },
      err => {
        this.messageService.displayMessage("Could not get Your Location")
      }
    )
  }
}
