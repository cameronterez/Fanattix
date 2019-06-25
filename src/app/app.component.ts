import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';
import { Router, NavigationEnd } from '@angular/router';

declare let ga: Function

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'fanattix';
  currentUrl: any

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ){

    // subscribe to router events and send page views to Google Analytics
    this.router.events.subscribe(event => {

    if (event instanceof NavigationEnd) {
      ga('set', 'page', event.urlAfterRedirects);
      ga('send', 'pageview');

    }

  });
  }

  ngOnInit(){
    this.currentUrl = this.router.url
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
