import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@core/http/http.service';
import { IRideType } from '@core/interfaces/ride';

@Injectable({
  providedIn: 'root'
})
export class TyperideService extends HttpService<IRideType, number> {

  constructor(public http: HttpClient) {
    super(http, 'ridetype');
  }
}
