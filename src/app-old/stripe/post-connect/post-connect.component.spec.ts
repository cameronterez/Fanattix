import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostConnectComponent } from './post-connect.component';

describe('PostConnectComponent', () => {
  let component: PostConnectComponent;
  let fixture: ComponentFixture<PostConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostConnectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
