import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  errors: string[]

  constructor(private fb: FormBuilder, private auth: AuthService, private messageService: MessageService) { }

  ngOnInit() {
    this.initForm()
  }

  initForm(){
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(){
    let credentials = {
      username: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    this.auth.get_auth_token(credentials).subscribe(
      res => {
        if(res['error']){
          if(res['error']['non_field_errors']){
            this.messageService.displayMessage(res['error']['non_field_errors'][0])
          }else if(res['error']['field_errors']){
            this.errors = res['error']['field_errors']
          }
        }else{
          console.log(res)
          this.auth.auth_token = res['token']
          this.auth._userId.next(res['id'])
          this.auth.get_user()
          this.auth._loggedIn.next(true)
          this.auth.store_user(res['token'], res['id'])
        }
      },
      err => {
        if(err['error']['non_field_errors']){
          this.messageService.displayMessage(err['error']['non_field_errors'][0])
          this.errors = err['error']['non_field_errors']
        }else if(err['error']['field_errors']){
          this.messageService.displayMessage(err['error']['field_errors'])

          err['error']['field_errors'].forEach(element => {
            this.errors.push(element)
          })
        }else{
          this.errors = ['An Error Occurred']
        }
        console.log(err)
        console.log(err['error'])
      }
    )
  }

}
