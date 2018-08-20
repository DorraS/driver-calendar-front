import { User } from '@core/models/user-model';
import * as moment from 'moment';
import { MOMENT } from 'angular-calendar';

export class RideStyle {
    // tslint:disable-next-line:no-unused-expression
    'background-color': string;
    'grid-column-start': number;
    'grid-row-start': number;
    'grid-row-end': string;
    'z-index': number;
    'transform': string;
    'width': string;
    constructor(color, columnStart: number, rowStart: number, rowEnd: number, zIndex: number, transform: number, width: number) {
        this['background-color'] = color;
        this['grid-column-start'] = columnStart;
        this['grid-row-end'] =  `span ${rowEnd}`;
        this['grid-row-start'] =  rowStart;
        this['z-index'] = zIndex;
        this.transform = `translateX(${transform})`;
        this.width =  `${width} px`;
    }
   // aliceblue ;grid-column-start: 2;grid-row-start:  1; grid-row-end: span 2; z-index: 30; transform: translateX(0);width:100px"
}
