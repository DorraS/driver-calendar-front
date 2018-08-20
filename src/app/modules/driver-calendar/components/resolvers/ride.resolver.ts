
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRide } from '@core/interfaces/ride';
import { RideService } from '@core/services/ride/ride.service';


@Injectable()
export class RideResolver implements Resolve<IRide> {
  constructor(
    private rideService: RideService,
    private router: Router) {
  }


  resolve(route: ActivatedRouteSnapshot): Observable<IRide> | IRide {

    const id = +route.paramMap.get('id');

    return this.rideService.get(id).pipe(
      map(ride => {
        if (ride) {
          return ride;
        } else { // id not found
          this.router.navigate(['calendar']);
          return null;
        }
      })
    );
  }
}
