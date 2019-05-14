import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccurrenceEditComponent } from './occurrence-edit.component';

describe('OccurrenceEditComponent', () => {
  let component: OccurrenceEditComponent;
  let fixture: ComponentFixture<OccurrenceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccurrenceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccurrenceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
