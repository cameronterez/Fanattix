import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventUtilitiesComponent } from './event-utilities.component';

describe('EventUtilitiesComponent', () => {
  let component: EventUtilitiesComponent;
  let fixture: ComponentFixture<EventUtilitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventUtilitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventUtilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
