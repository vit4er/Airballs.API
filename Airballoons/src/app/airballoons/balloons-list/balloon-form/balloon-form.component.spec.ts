import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalloonFormComponent } from './balloon-form.component';

describe('BalloonFormComponent', () => {
  let component: BalloonFormComponent;
  let fixture: ComponentFixture<BalloonFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalloonFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalloonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
