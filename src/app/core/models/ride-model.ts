import { User } from '@core/models/user-model';
import * as moment from 'moment';
import { RideStyle } from '@core/models/ride-style-ride';

export class Ride {

    date?: moment.Moment;
    departHour?: moment.Moment;
    arrivalHour?: moment.Moment;
    duration?: moment.Duration;
    departAdresse: any;
    arrivalAdresse: any;
    costumer?: User;
    driver?: User;
    status?: any;
    style: RideStyle;

    constructor(departAdresse?, arrivalAdresse?, date?, departDate?, duration?: number, color?) {
        this.arrivalAdresse = arrivalAdresse;
        this.departAdresse = departAdresse;
        this.duration =  moment.duration(duration * 1000);
        this.departHour = departDate;
        this.arrivalHour = moment(departDate).add(duration, 'second');
        const rowStart = this.rowStart(departDate);
        const rowEnd = this.rowEnd(duration);
        this.style = new RideStyle(color, 2, rowStart, rowEnd, 10, 0, 1000);
    }

    diffHour(): number {
        return 3;
    }

    private rowEnd(duration): number {
        const test = moment.duration(360000);
        const diffTmp = this.duration.asHours();
        const diffh = Number((Math.round(diffTmp * 2) / 2).toFixed(1)) * 2;
        return diffh;
    }
    private rowStart(pDepartDate): number {
        const beginDate = moment('00:00', 'HH:mm');
        const diffTmp = pDepartDate.diff(beginDate, 'hours', true);
        const diffh = Number((Math.round(diffTmp * 2) / 2).toFixed(1)) * 2 + 1;
        return diffh;
    }


}

export const rides: Ride[] = [
    new Ride('1 pierre mendes france', '2 pierre mendes france', moment(), moment('9:00', 'HH:mm'), 16200, 'red'),
    new Ride('1 pierre mendes france', '2 pierre mendes france', moment(), moment('9:00', 'HH:mm'), 3600, 'green'),
    new Ride('1 pierre mendes france', '2 pierre mendes france', moment(), moment('9:00', 'HH:mm'), 3600, 'blue'),
    new Ride('1 pierre mendes france', '2 pierre mendes france', moment(), moment('9:00', 'HH:mm'), 3600, 'yellow'),
    new Ride('1 pierre mendes france', '2 pierre mendes france', moment(), moment('10:30', 'HH:mm'), 4800, 'blue'),
];



export const ridesMap: any = ['9:00'];
