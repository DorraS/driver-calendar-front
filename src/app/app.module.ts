import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { RouterModule } from '@angular/router';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule } from 'angular-calendar';
import { TestCalanderComponent } from './test-calander/test-calander.component';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { SharedModule } from '@shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    TestCalanderComponent,
   CalendarHeaderComponent,
  ],
  imports: [ BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    NgbModule.forRoot(),
    NgbModalModule.forRoot(),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot()
  ],
  exports: [CommonModule, RouterModule, FormsModule, TestCalanderComponent, CalendarHeaderComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

