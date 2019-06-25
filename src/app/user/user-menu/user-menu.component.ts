import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter()
  loggedIn: boolean
  user: User

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth._loggedIn.subscribe(
      val => {
        this.loggedIn = val
        this.user = this.auth.user
      },
      err => console.log(err)
    )
  }

  logUser(){
    console.log(this.user)
  }

  logout(){
    this.auth.logout()
  }

  menuItemClicked(){
    this.toggleMenu.emit()
  }

}
