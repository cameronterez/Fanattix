import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteTicketOptionComponent } from './confirm-delete-ticket-option.component';

describe('ConfirmDeleteTicketOptionComponent', () => {
  let component: ConfirmDeleteTicketOptionComponent;
  let fixture: ComponentFixture<ConfirmDeleteTicketOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteTicketOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteTicketOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
