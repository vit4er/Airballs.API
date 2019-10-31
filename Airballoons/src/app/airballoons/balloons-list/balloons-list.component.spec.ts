import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalloonsListComponent } from './balloons-list.component';

describe('BalloonsListComponent', () => {
  let component: BalloonsListComponent;
  let fixture: ComponentFixture<BalloonsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalloonsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalloonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
