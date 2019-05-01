import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  accountMenu = false

  constructor() { }

  ngOnInit() {
  }

  toggleAccountMenu(){
    this.accountMenu = this.accountMenu == true ? false : true
  }
}
