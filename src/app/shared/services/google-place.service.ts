import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GooglePlaceService {

  GOOGLE_PLACE_URL = '/google/maps/api/place/autocomplete/';
  OUT_PUT = 'json';
  API_KEY = 'AIzaSyBeFN-1r4UQlOcVLkxE7q5crkFiocOEAaU';


  constructor(private http: HttpClient) { }

  findPlacesPropositons(input: string): Observable<string[]> {
    const params = {
      key: this.API_KEY,
      input: input
    };

    return this.http.get<any>(this.GOOGLE_PLACE_URL + this.OUT_PUT, { params }).pipe(
      map(data => data.predictions.map(x => x.description as string)
      )
    );
  }


}
