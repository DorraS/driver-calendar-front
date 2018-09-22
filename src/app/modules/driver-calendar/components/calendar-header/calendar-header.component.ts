import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'dc-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.sass']
})
export class CalendarHeaderComponent  {

  @Input() view: string;

  @Input() viewDate: Date;

  @Input() locale: 'en';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

}
