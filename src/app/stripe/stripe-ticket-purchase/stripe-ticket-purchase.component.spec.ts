import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeTicketPurchaseComponent } from './stripe-ticket-purchase.component';

describe('StripeTicketPurchaseComponent', () => {
  let component: StripeTicketPurchaseComponent;
  let fixture: ComponentFixture<StripeTicketPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeTicketPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeTicketPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
