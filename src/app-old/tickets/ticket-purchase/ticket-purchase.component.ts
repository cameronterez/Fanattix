import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../event.service';
import { TicketOption } from '../../models/ticket-option';

@Component({
  selector: 'app-ticket-purchase',
  templateUrl: './ticket-purchase.component.html',
  styleUrls: ['./ticket-purchase.component.css']
})
export class TicketPurchaseComponent implements OnInit {
  option: TicketOption
  quantity = 1

  constructor(
    private route: ActivatedRoute, 
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTicketOption()
  }

  getTicketOption(){
    let id = this.route.snapshot.paramMap.get('id')
    this.eventService.getTicketOptionDetail(id).subscribe(
      res => {
        this.option = res
        console.log(res)
      },
      err => console.log(err)
    )
  }

  purchaseTicket(ticketOptionId){
    this.eventService.purchaseTicket(ticketOptionId, this.quantity).subscribe(
      res => {
        console.log(res)
        this.router.navigate(['purchase-complete'])
      },
      err => console.log(err)
    )
  }

}
