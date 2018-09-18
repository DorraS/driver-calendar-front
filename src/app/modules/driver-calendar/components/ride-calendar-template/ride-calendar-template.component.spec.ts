import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideCalendarTemplateComponent } from './ride-calendar-template.component';

describe('RideCalendarTemplateComponent', () => {
  let component: RideCalendarTemplateComponent;
  let fixture: ComponentFixture<RideCalendarTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideCalendarTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideCalendarTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
