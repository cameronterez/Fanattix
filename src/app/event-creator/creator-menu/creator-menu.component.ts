import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UtilitiesService } from '../../utilities.service';
import { EventCreatorSingleComponent } from '../event-creator-single/event-creator-single.component';

@Component({
  selector: 'app-creator-menu',
  templateUrl: './creator-menu.component.html',
  styleUrls: ['./creator-menu.component.css']
})
export class CreatorMenuComponent implements OnInit {
  currentUrl: any
  @ViewChild('creator') creator: EventCreatorSingleComponent

  constructor(
    private router: Router,
    private util: UtilitiesService
  ) { }

  ngOnInit() {
    this.currentUrl = this.router.url
    this.getUrl()
  }

  scrollToElement(el){
    let element = document.getElementById(el)
    this.util.scrollToElement(element)
  }

  goToMyEvents(){
    this.router.navigate(['creator/my-events'])
  }

  getUrl(){
    this.util.currentUrl.subscribe(
      val => {
        this.currentUrl = val
        console.log(this.currentUrl)
      },
      err => console.log('Creator Menu could not get currentUrl')
    )
  }

  toggleSlide(){
    // Implement slider
    console.log('toggle slide')
    let slider = document.getElementById('creator-panel')
    if(slider.classList.contains('closed')){
      slider.classList.remove('closed')
    }else{
      slider.classList.add('closed')
    }
  }
}
