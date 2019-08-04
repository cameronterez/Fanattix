import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventHorizontalScrollComponent } from './event-horizontal-scroll.component';

describe('EventHorizontalScrollComponent', () => {
  let component: EventHorizontalScrollComponent;
  let fixture: ComponentFixture<EventHorizontalScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventHorizontalScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventHorizontalScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
