import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarRoutingModule } from '@modules/driver-calendar/calendar-routing.module';
import { DriverCalendarComponent } from './pages/driver-calendar/driver-calendar.component';
import { CalendarComponent } from '@modules/driver-calendar/components/calendar/calendar.component';
import { RideDetailComponent } from '@modules/driver-calendar/components/ride-detail/ride-detail.component';
import { RideItemComponent } from '@modules/driver-calendar/components/ride-item/ride-item.component';
import { RideResolver } from '@modules/driver-calendar/components/resolvers/ride.resolver';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component';
import { RideCalendarTemplateComponent } from '@modules/driver-calendar/components/ride-calendar-template/ride-calendar-template.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarRoutingModule,
    NgbModule,
    NgSelectModule,
   // NgbModalModule.forRoot(),
   SharedModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot()
  ],
  declarations: [
    CalendarComponent,
    RideDetailComponent,
    DriverCalendarComponent,
    RideItemComponent,
    CalendarHeaderComponent,
    RideCalendarTemplateComponent,
  ],
  exports: [CalendarComponent, RideDetailComponent, DriverCalendarComponent, RideItemComponent],
  providers: [ RideResolver]
})
export class DiverCalendarModule { }
