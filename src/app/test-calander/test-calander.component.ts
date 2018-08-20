import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent, CalendarEventAction } from '../../../node_modules/angular-calendar';
import { CustomEventTitleFormatter } from '../custom-event-title-formatter';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'dc-test-calander',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './test-calander.component.html',
  styleUrls: ['./test-calander.component.css'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    }
  ]
})
export class TestCalanderComponent implements OnInit {

  view = 'month';

  viewDate: Date = new Date();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  events: CalendarEvent[] = [
    {
      title: 'An event',
      start: new Date(),
      end: new Date('2018-08-12T16:24:00'),
      color: colors.red,
      actions: this.actions,
    },
    {
      title: 'An event 1',
      start: new Date(),
      end: new Date('2018-08-12T18:24:00'),
      color: colors.blue,
      actions: this.actions,
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  handleEvent(action, event) {
    console.log(event);
  }

}
