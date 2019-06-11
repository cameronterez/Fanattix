import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedPaymentMethodsComponent } from './saved-payment-methods.component';

describe('SavedPaymentMethodsComponent', () => {
  let component: SavedPaymentMethodsComponent;
  let fixture: ComponentFixture<SavedPaymentMethodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedPaymentMethodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedPaymentMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
