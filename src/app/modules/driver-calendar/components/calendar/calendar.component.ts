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
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { Subject, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RideService } from '@core/services/ride/ride.service';
import { map } from 'rxjs/operators';
import { IRide } from '@core/interfaces/ride';
import { HttpClient, HttpParams } from '@angular/common/http';
import { duration } from 'moment';
import * as moment from 'moment';

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


  // events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: colors.red,
  //     actions: this.actions
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: colors.yellow,
  //     actions: this.actions
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: colors.blue
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: new Date(),
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: true
  //   }
  // ];

  activeDayIsOpen = true;

  constructor(private modal: NgbModal, private rideSerive: RideService, private http: HttpClient) { }

  ngOnInit(): void {

     this.fetchEvents();
  }

  fetchEvents(): void {
     this.events$ = this.rideSerive.getAll().pipe(map(rideTmp => {
      return rideTmp.map(ride => {
        console.log(moment('2018-09-30').add( 19023 / 3600 , 'hours'));
        const result =  moment(new Date()).add(19023 / 3600, 'hours');
         // add(new Date(2014, 6, 10, 12, 45, 0), new Date(ride.estimate.duration.value * 1000).toISOString().substr(11, 8);
        console.log(result);
        const event: CalendarEvent<IRide> = {} as CalendarEvent<IRide>;
       // event.draggable = true;
        event.id =  ride.id;
        event.title = ` client  : ${ride.customer.firstName}  ${ride.customer.firstName} `;

        // tslint:disable-next-line:max-line-length
        event.start =  new Date(ride.departureDate);
        event.end =  moment(event.start).add(ride.estimate.duration.value / 3600, 'hours').toDate();
        // tslint:disable-next-line:max-line-length
       // event.resizable = {beforeStart: true, afterEnd: true};
        event.meta = ride;
        console.log('test ride', event);
        return event;
      });
    }));
  }

  fetchEvents_test(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];

    const params = new HttpParams()
      .set(
        'primary_release_date.gte',
        format(getStart(this.viewDate), 'YYYY-MM-DD')
      )
      .set(
        'primary_release_date.lte',
        format(getEnd(this.viewDate), 'YYYY-MM-DD')
      )
      .set('api_key', '0ec33936a68018857d727958dca1424f');

    this.events$ = this.http
      .get('https://api.themoviedb.org/3/discover/movie', { params })
      .pipe(
        map(({ results }: { results: any[] }) => {
          return results.map((film: any) => {
            return {
              title: film.title,
              start: new Date(film.release_date),
              color: colors.yellow,
              meta: {
                film
              }
            };
          });
        })
      );
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
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
    // this.events.push({
    //   title: 'New event',
    //   start: startOfDay(new Date()),
    //   end: endOfDay(new Date()),
    //   color: colors.red,
    //   draggable: true,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   }
    // });
    this.refresh.next();
  }

}
