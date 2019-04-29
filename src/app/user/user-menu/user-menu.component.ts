import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
  loggedIn: boolean

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.loggedIn.subscribe(
      val => this.loggedIn = val,
      err => console.log(err)
    )
  }

}
