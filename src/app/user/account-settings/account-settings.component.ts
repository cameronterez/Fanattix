import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { MessageService } from '../../message.service';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  user_id: string
  user: User
  profileForm: FormGroup

  constructor(private authService: AuthService, private messageService: MessageService, private fb: FormBuilder) { }

  ngOnInit() {
    this.authService._loggedIn.subscribe(
      val => {
        this.user = this.authService.user
        this.initForm()
        console.log(this.user)
      },
      err => this.messageService.displayMessage('Could not Check Login')
    )
    
    console.log(this.user)
    console.log(this.authService.user)
  }

  initForm(){
    this.profileForm = this.fb.group({
      first_name : [this.user.first_name, Validators.required],
      last_name: [this.user.last_name, Validators.required],
      email : [this.user.email, Validators.required],
      receives_emails : [this.user.receives_emails],
      receives_emails_from_organizers: [this.user.receives_emails_from_organizers],
      profile_img: [this.user.profile_img]
    })

    console.log(this.profileForm.value)
  }

  saveProfile(){
    let content = this.profileForm.value
    this.authService.saveProfile(content).subscribe(
      res => {
        console.log(res)
        this.user = res
        this.authService.user = res
      },
      err => console.log(err)
    )
  }

}
