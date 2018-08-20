import { CalendarEventTitleFormatter, CalendarEvent } from '../../node_modules/angular-calendar';
import { Inject, LOCALE_ID } from '../../node_modules/@angular/core';
import { DatePipe } from '../../node_modules/@angular/common';

export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
    constructor(@Inject(LOCALE_ID) private locale: string) {
        super();
    }

    // you can override any of the methods defined in the parent class

    month(event: CalendarEvent): string {
        return `<b>${new DatePipe(this.locale).transform(
            event.start,
            'h:m a',
            this.locale
        )}</b> ${event.title}`;
    }

    week(event: CalendarEvent): string {
        return `<b>${new DatePipe(this.locale).transform(
            event.start,
            'h:m a',
            this.locale
        )}</b> ${event.title}`;
    }

    day(event: CalendarEvent): string {
        return `<b>${new DatePipe(this.locale).transform(
            event.start,
            'h:m a',
            this.locale
        )}</b> ${event.title}`;
    }
}

