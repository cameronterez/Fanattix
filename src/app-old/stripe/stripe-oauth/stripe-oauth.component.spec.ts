import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeOAuthComponent } from './stripe-oauth.component';

describe('StripeOAuthComponent', () => {
  let component: StripeOAuthComponent;
  let fixture: ComponentFixture<StripeOAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeOAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeOAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
