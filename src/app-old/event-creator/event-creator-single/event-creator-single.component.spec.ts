import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreatorSingleComponent } from './event-creator-single.component';

describe('EventCreatorSingleComponent', () => {
  let component: EventCreatorSingleComponent;
  let fixture: ComponentFixture<EventCreatorSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCreatorSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCreatorSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
