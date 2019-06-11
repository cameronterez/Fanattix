import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StripeService } from '../../stripe.service';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-saved-payment-methods',
  templateUrl: './saved-payment-methods.component.html',
  styleUrls: ['./saved-payment-methods.component.css']
})
export class SavedPaymentMethodsComponent implements OnInit {
  paymentMethods: any

  constructor(private stripeService: StripeService, private messageService: MessageService) { }

  ngOnInit() {
    this.getPaymentMethods()
  }

  getPaymentMethods(){
    this.stripeService.getPaymentMethods().subscribe(
      res => {
        console.log(res)
        this.paymentMethods = res['payment_methods']
      },
      err => {
        console.log(err)
        this.messageService.displayMessage('Could Not Retrieve Your Payment Methods')
      }
    )
  }

}
