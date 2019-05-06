import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOccurrenceComponent } from './edit-occurrence.component';

describe('EditOccurrenceComponent', () => {
  let component: EditOccurrenceComponent;
  let fixture: ComponentFixture<EditOccurrenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOccurrenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOccurrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
