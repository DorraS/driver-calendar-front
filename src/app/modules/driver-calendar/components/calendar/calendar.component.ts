import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  addMinutes,
  startOfMonth,
  startOfWeek,
  endOfWeek,
  format,
  addSeconds
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewDay
} from 'angular-calendar';
import { Subject, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RideService } from '@core/services/ride/ride.service';
import { map } from 'rxjs/operators';
import { IRide } from '@core/interfaces/ride';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as moment from 'moment';
import { IUser } from '@core/interfaces/user.interface';

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
  selector: 'dc-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {



  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  // default view is to day
  view = 'day';
  // default view date is to day
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

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
        // this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events$: Observable<CalendarEvent<any>[]>;


  activeDayIsOpen = true;

  constructor(private modal: NgbModal, private rideSerive: RideService, private http: HttpClient) { }

  ngOnInit(): void {

    this.fetchEvents();
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(cell => {
      const groups: any = {};
      cell.events.forEach((event: CalendarEvent<{ driver: IUser }>) => {
        console.log(event.meta);
        groups[event.meta.driver.id] = groups[event.meta.driver.id] || [];
        groups[event.meta.driver.id].push(event);
      });
      console.log(Object.entries(groups));
      cell['eventGroups'] = Object.entries(groups);
    });
  }

  fetchEvents(): void {
    this.events$ = this.rideSerive.getAll().pipe(map(rideTmp => {
      return rideTmp.map(ride => {
        const event: CalendarEvent<IRide> = {} as CalendarEvent<IRide>;
        event.id = ride.id;
        event.title = ` client  : ${ride.customer.firstName}  ${ride.customer.lastName} `;
       console.log('color', ride.driver);
        event.color = {
          primary: '#FAE3E3',
          secondary: ride.driver.color
        },
       // event.actions = this.actions;
          // tslint:disable-next-line:max-line-length
        event.start = new Date(ride.departureDate);
        const endEvent = moment(event.start).add(ride.estimate.duration.value / 3600, 'hours');
        const remainder = 30 - (endEvent.minute() % 30);
        event.end =  moment(endEvent).add(remainder, 'minutes').toDate();

        // tslint:disable-next-line:max-line-length
        // event.resizable = {beforeStart: true, afterEnd: true};
        event.meta = ride;
        console.log('test ride', event);
        return event;
      });
    }));
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.refresh.next();
  }

}
