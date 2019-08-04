import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event-delete-modal',
  templateUrl: './event-delete-modal.component.html',
  styleUrls: ['./event-delete-modal.component.css']
})
export class EventDeleteModalComponent implements OnInit {

  constructor(public modal: NgbActiveModal) {}

  ngOnInit() {
  }

}
