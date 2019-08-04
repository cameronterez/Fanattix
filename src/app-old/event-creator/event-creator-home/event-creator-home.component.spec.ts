import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreatorHomeComponent } from './event-creator-home.component';

describe('EventCreatorHomeComponent', () => {
  let component: EventCreatorHomeComponent;
  let fixture: ComponentFixture<EventCreatorHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCreatorHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCreatorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
