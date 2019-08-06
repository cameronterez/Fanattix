import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListNestedComponent } from './event-list-nested.component';

describe('EventListNestedComponent', () => {
  let component: EventListNestedComponent;
  let fixture: ComponentFixture<EventListNestedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventListNestedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListNestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
