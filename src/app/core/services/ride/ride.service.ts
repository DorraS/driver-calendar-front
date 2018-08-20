import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/http/http.service';
import { IRide } from '@core/interfaces/ride';
import { Ride } from '@core/models/ride-model';
import { Moment } from 'moment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RideService extends HttpService<IRide, number> {

  constructor(public http: HttpClient) {
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

}
