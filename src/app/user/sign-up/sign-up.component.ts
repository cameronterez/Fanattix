import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { MessageService } from '../../message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup
  errors = []
  validationErrors = {}

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private msgService: MessageService, 
    private router: Router, 
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.initForm()
  }

  initForm(){
    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      password : ['', Validators.required],
      password_2 : ['', Validators.required],
      first_name : ['', Validators.required],
      last_name : ['', Validators.required],
    })
  }

  signUp(){
    this.clearErrors() //clear all previous errors

    if(this.signUpForm.get('password').value == this.signUpForm.get('password_2').value && this.signUpForm.get('password').value != ''){
      let content = {
        username : this.signUpForm.get('email').value,
        email : this.signUpForm.get('email').value,
        password : this.signUpForm.get('password').value,
        first_name : this.signUpForm.get('first_name').value,
        last_name : this.signUpForm.get('last_name').value,
      }

      this.auth.signUp(content).subscribe(
        res => {
          console.log(res)
          this.auth.user = res
          this.auth._loggedIn.next(true)
          let credentials = { username: this.signUpForm.get('email').value, password: this.signUpForm.get('password').value }
          console.log(credentials)
          this.auth.get_auth_token(credentials).subscribe( //then get token
            res => {
              if(res['error']){
                if(res['error']['non_field_errors']){
                  this.messageService.displayMessage(res['error']['non_field_errors'][0])
                }else if(res['error']['field_errors']){
                  this.errors = res['error']['field_errors']
                }
              }else{
                console.log(res)
                this.auth._userId.next(res['id'])
                this.auth.auth_token = res['token']
                this.auth.store_user(res['token'], res['id'])
                this.auth._loggedIn.next(true)
                console.log('Done')
                this.router.navigate(['account-settings'])
              }
            },
            err => {
              console.log(err)
              if(err['error']){ 
                console.log(err['error']['username'])
                if(err['error']['username']){
                  this.errors = err['error']
                  console.log(this.errors['username'])
                }            
                 
              }              
            }
          )
        },
        err => console.log(err)
      )
    }else{
      this.msgService.displayMessage('Passwords Do Not Match')
      this.validationErrors = {'passwordMatch': 'Passwords do not match'}
    }
  }

  clearErrors(){
    this.validationErrors = {}
    this.errors = []
  }

}
