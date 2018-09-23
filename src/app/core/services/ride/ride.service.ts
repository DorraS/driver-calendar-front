import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/http/http.service';
import { IRide, RIDE_PRICE } from '@core/interfaces/ride';
import { Ride } from '@core/models/ride-model';
import { Moment } from 'moment';
import { Observable, of } from 'rxjs';
import * as moment from 'moment';
import * as _ from 'lodash';
import { GoogleService } from '@shared/services/google.service';
import {  tap, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RideService extends HttpService<IRide, number> {

  constructor(public http: HttpClient, private googleService: GoogleService) {
    super(http, 'ride');
  }

  getAllRideByDay(date: Date | Moment): Observable<IRide[]> {

    const where: any = {
      'departureDate': { 'startsWith': '2017-07-02' }
    };

    return this.getAll({ where });
  }

  getAllRideByMoth(date: Date | Moment): Ride[] {
    return null;
  }

  getAllRideByWeek(date: Date | Moment): Ride[] {
    return null;
  }

  calculTrarifClient(ride: IRide): Observable<IRide> {

    let priceTotal = 0;

    const rideType = ride && ride.rideType && ride.rideType.code;
    if (rideType && RIDE_PRICE[rideType]) {

      const departTime = moment(ride.departureDate);
      const distance = ride.estimate.distance.value / 1000;

      let priceTmp = 0;
      if ((departTime.hour() <= 7 && departTime.hour() <= 19)) {
        priceTmp = RIDE_PRICE[rideType]['DAY'];
      } else {
        priceTmp = RIDE_PRICE[rideType]['NIGHT'];
      }
      priceTotal = _.round(3 + (priceTmp * distance), 2);
    }
    ride.estimate['price'] = { 'text': `${priceTotal} €`, 'value': priceTotal };
    return of(ride);

  }

  estimateRide(rideInfo: IRide): Observable<any> {
    console.log(rideInfo);
   return this.googleService.
      estimateRide(
        rideInfo.arrivalAddress,
        rideInfo.departureAdress,
        rideInfo.departureDate
      ).pipe( map( data =>  {
        rideInfo.estimate = data;
        return rideInfo;
      }),
        switchMap( (ride) =>  this.calculTrarifClient(ride))
      );
  }

}
