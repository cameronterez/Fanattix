import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeSaveCardComponent } from './stripe-save-card.component';

describe('StripeSaveCardComponent', () => {
  let component: StripeSaveCardComponent;
  let fixture: ComponentFixture<StripeSaveCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeSaveCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeSaveCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
