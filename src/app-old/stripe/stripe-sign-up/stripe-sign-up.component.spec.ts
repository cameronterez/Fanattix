import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeSignUpComponent } from './stripe-sign-up.component';

describe('StripeSignUpComponent', () => {
  let component: StripeSignUpComponent;
  let fixture: ComponentFixture<StripeSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
