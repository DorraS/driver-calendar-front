import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverCalendarComponent } from './driver-calendar.component';

describe('DriverCalendarComponent', () => {
  let component: DriverCalendarComponent;
  let fixture: ComponentFixture<DriverCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
