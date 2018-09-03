import { Injectable } from '@angular/core';
import { HttpService } from '@core/http/http.service';
import { IRight } from '@core/interfaces/role.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RightService extends HttpService<IRight, number> {

  constructor(http: HttpClient) {
    super( http,  'right');
  }
}
