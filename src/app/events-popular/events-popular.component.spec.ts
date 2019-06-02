import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsPopularComponent } from './events-popular.component';

describe('EventsPopularComponent', () => {
  let component: EventsPopularComponent;
  let fixture: ComponentFixture<EventsPopularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsPopularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
