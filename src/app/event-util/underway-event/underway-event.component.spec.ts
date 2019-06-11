import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderwayEventComponent } from './underway-event.component';

describe('UnderwayEventComponent', () => {
  let component: UnderwayEventComponent;
  let fixture: ComponentFixture<UnderwayEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderwayEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderwayEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
