import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';
import { Router, NavigationEnd } from '@angular/router';
import { UtilitiesService } from './utilities.service';
import { EventService } from './event.service';

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
    private router: Router,
    private util: UtilitiesService,
    private eventService: EventService
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
    console.log(this.currentUrl)
    navigator.geolocation.getCurrentPosition(
      loc => {
        this.authService.location = loc
        console.log(loc.coords)
        /*this.eventService.getEventsNearby(loc.coords).subscribe(
          res => {
            console.log(res)
            this.eventService.eventsNearBy.next(res['events'])
          },
          err => console.log(err)
        )*/
      },
      err => {
        this.messageService.displayMessage("Could not get Your Location")
      }
    )

    this.getUrl()
  }

  getUrl(){
    this.router.events.subscribe(
      event => {
        if(event instanceof NavigationEnd){
          //console.log(this.router.url)
          this.currentUrl = this.router.url
          this.util.currentUrl.next(this.router.url)
        }
      }
    )
  }
  
}
