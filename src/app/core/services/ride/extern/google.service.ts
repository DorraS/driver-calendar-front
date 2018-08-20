import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



const googleConfig = {
  host: 'https://maps.googleapis.com/maps/api/distancematrix/json'
  , token: 'AIzaSyDmDFHzgdj4A44UN6YiA-TwEzomz-6svhA'
};

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private http: HttpClient) {
  }


  estimateRide(departAdress: any, arrivalAdress: any, departureTime): Observable<any> {

    console.log('111111111111111111111111111111');
    return this.http.get<any>(googleConfig.host, {
      params: {
        language: 'fr',
        departure_time: departureTime,
        units: 'metric',
        mode: 'driving',
        origins: departAdress,
        destinations: arrivalAdress,
        key: googleConfig.token
      }
    }).pipe(map( data => {
      const info = data.rows[0].elements[0];
      return {
        orginAdress: data.origin_addresses[0],
        destinationAddresses: data.destination_addresses[0],
        distance: info.distance.value, // distance en m
        duration: info.duration_in_traffic.value, // duration en s
      };
    }));
  }

}
