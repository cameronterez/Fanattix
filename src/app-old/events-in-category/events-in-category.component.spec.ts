import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsInCategoryComponent } from './events-in-category.component';

describe('EventsInCategoryComponent', () => {
  let component: EventsInCategoryComponent;
  let fixture: ComponentFixture<EventsInCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsInCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsInCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
