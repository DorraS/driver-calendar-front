import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  GOOGLE_PLACE_URL = '/google/maps/api/place/autocomplete/';
  GOOGLE_MAP_URL = 'google/maps/api/distancematrix/';
  OUT_PUT = 'json';
  API_KEY = 'AIzaSyBeFN-1r4UQlOcVLkxE7q5crkFiocOEAaU';


  constructor(private http: HttpClient) { }

  findPlacesPropositons(input: string): Observable<Place[]> {
    const params = {
      key: this.API_KEY,
      input: input
    };

    return this.http.get<any>(this.GOOGLE_PLACE_URL + this.OUT_PUT, { params }).pipe(
      map(data => data.predictions.map(x => x as Place),
      tap((data) => console.log('gooogle ', data))
      )
    );
  }



  estimateRide(departAdress: Place, arrivalAdress: Place, departureTime): Observable<any> {
    return this.http.get<any>(this.GOOGLE_MAP_URL + '/json', {
      params: {
        language: 'fr',
        // departure_time: departureTime,
        units: 'metric',
        mode: 'driving',
        origins: `place_id:${departAdress.place_id}`,
        destinations: `place_id:${arrivalAdress.place_id}`,
        key: this.API_KEY
      }
    }).pipe(map(data => {
      console.log(data);
      // return data;
     return  data.rows[0].elements[0];
    }));
  }
}


export interface Place {

  description: string;
  id: string;
  place_id: string;
  reference: string;
  types: string[];
}
