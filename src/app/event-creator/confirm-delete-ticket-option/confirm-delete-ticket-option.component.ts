import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-ticket-option',
  templateUrl: './confirm-delete-ticket-option.component.html',
  styleUrls: ['./confirm-delete-ticket-option.component.css']
})
export class ConfirmDeleteTicketOptionComponent implements OnInit {

  constructor() { }
  @Input() ticketOption

  ngOnInit() {
  }

}
