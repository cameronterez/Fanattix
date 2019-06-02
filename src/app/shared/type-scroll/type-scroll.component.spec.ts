import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeScrollComponent } from './type-scroll.component';

describe('TypeScrollComponent', () => {
  let component: TypeScrollComponent;
  let fixture: ComponentFixture<TypeScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
