import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CamSplashComponent } from './cam-splash.component';

describe('CamSplashComponent', () => {
  let component: CamSplashComponent;
  let fixture: ComponentFixture<CamSplashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CamSplashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CamSplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
