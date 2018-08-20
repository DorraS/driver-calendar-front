import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '@core/interfaces/user.interface';
import { HttpService } from '@core/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService<IUser, number> {

  constructor(public http: HttpClient) {
    super(http, 'user');
  }

  getUserByEmail(email: String): Observable<IUser[]> {
    const where: any = {
      'email': email
    };
    return this.getAll({ where });
  }

  getUserByPhoneNumber(phoneNumber: Number): Observable<IUser[]> {
    const where = {
      'phoneNumber': phoneNumber
    };
    return this.getAll({ where });
  }
}
