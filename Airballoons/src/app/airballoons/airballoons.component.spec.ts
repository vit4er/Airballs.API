import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirballsComponent } from './airballoons.component';

describe('AirballsComponent', () => {
  let component: AirballsComponent;
  let fixture: ComponentFixture<AirballsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirballsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirballsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
