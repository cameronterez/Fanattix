import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
 
import { StripeService as NgxStripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "ngx-stripe";
import { StripeService } from '../../stripe.service';
import { AuthGuardService } from '../../auth-guard.service';
import { AuthService } from '../../auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stripe-ticket-purchase',
  templateUrl: './stripe-ticket-purchase.component.html',
  styleUrls: ['./stripe-ticket-purchase.component.css']
})
export class StripeTicketPurchaseComponent implements OnInit {
  @Input() ticketPrice: number
  @Input() creatorId: number
  @Input() ticketOptionId: number
  @Input() quantity: number
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  user: User
 
  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };
 
  elementsOptions: ElementsOptions = {
    locale: 'en'
  };
 
  stripeTest: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private ngxstripeService: NgxStripeService,
    private stripeService: StripeService,
    private authService: AuthService,
    private router: Router
  ) {}
 
  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });

    this.getUser()
  }
 
  buy() { //for paid tickets, generate token to send card to server
    const name = this.stripeTest.get('name').value;
    this.ngxstripeService.stripe
      .createToken(this.card.getCard(), { name })
      .subscribe(result => {
        if (result.token) {
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          console.log(result.token.id);
          let data = {
            source_token : result.token.id,
            amount : this.ticketPrice, //convert ticket price to cents for Stripe
            creatorId : this.creatorId,
            ticket_option_id: this.ticketOptionId,
            quantity: this.quantity,
            user_id: this.authService._userId.value
          }
          console.log(data)
          this.stripeService.sendToken(data).subscribe(
            res => {
              console.log(res)
              if(res.hasOwnProperty('error')){
                console.log(res['error'])
              }else{
                this.router.navigate(['purchase-complete'])
              }
            },
            err => console.log(err)
          )
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  buyFree(){  //When purchasing free ticket, do not generate stripe token
    let data = {
      source_token : null,
      amount : this.ticketPrice, //convert ticket price to cents for Stripe
      creatorId : this.creatorId,
      ticket_option_id: this.ticketOptionId,
      quantity: this.quantity,
      user_id: this.authService._userId.value
    }

    this.stripeService.sendToken(data).subscribe(
      res => {
        console.log(res)
        if(res.hasOwnProperty('error')){
          console.log(res['error'])
        }else{
          this.router.navigate(['purchase-complete'])
        }
      },
      err => console.log(err)
    )
  }

  getUser(){
    this.user = this.authService.user
    console.log(this.user)
  }
}