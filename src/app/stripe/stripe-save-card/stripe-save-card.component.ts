import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { StripeCardComponent, ElementOptions, ElementsOptions } from 'ngx-stripe';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { StripeService } from '../../stripe.service';
import { StripeService as NgxStripeService } from 'ngx-stripe'

@Component({
  selector: 'app-stripe-save-card',
  templateUrl: './stripe-save-card.component.html',
  styleUrls: ['./stripe-save-card.component.css']
})
export class StripeSaveCardComponent implements OnInit {
  @Input() ticketPrice: number
  @Input() creatorId: number
  @Input() ticketOptionId: number
  @Input() quantity: number
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
 
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
    private authService: AuthService
  ) {}
 
  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }
 
  saveCard() {
    const name = this.stripeTest.get('name').value;
    this.ngxstripeService.stripe
      .createToken(this.card.getCard(), { name })
      .subscribe(result => {
        if (result.token) {
          // Use the token to save customer info
          // https://stripe.com/docs/charges
          console.log(result.token.id);
          let data = {
            source_token : result.token.id,
            user_id: this.authService._userId.value,
            email : this.authService.user.email
          }
          console.log(data)
          this.stripeService.saveCard(data).subscribe(
            res => {
              console.log(res)
            },
            err => console.log(err)
          )
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }
}
