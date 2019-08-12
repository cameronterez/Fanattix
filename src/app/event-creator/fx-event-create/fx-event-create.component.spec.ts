import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FxEventCreateComponent } from './fx-event-create.component';

describe('FxEventCreateComponent', () => {
  let component: FxEventCreateComponent;
  let fixture: ComponentFixture<FxEventCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FxEventCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FxEventCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
