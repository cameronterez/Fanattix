import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTicketOptionComponent } from './edit-ticket-option.component';

describe('EditTicketOptionComponent', () => {
  let component: EditTicketOptionComponent;
  let fixture: ComponentFixture<EditTicketOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTicketOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTicketOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
