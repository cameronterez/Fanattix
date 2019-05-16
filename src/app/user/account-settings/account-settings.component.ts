import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { MessageService } from '../../message.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  user_id: string
  user: User

  constructor(private authService: AuthService, private messageService: MessageService) { }

  ngOnInit() {
    this.authService._loggedIn.subscribe(
      val => this.user = this.authService.user,
      err => this.messageService.displayMessage('Could not Check Login')
    )
    
    console.log(this.user)
    console.log(this.authService.user)
  }

}
