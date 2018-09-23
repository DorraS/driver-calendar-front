import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IUser, userHasRole } from '@core/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = '/api/login';
  private logoutUrl = '/api/logout';
  private conneted$ = new BehaviorSubject<IUser>(null);
  private currUser: IUser;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(login, password): Observable<any> {
    return this.http.post<any>(this.authUrl, { 'password': password, 'username': login })
      .pipe(
        map(data => {
          localStorage.setItem('currUser', JSON.stringify(data.user));
          this.currUser = data.user;
          this.conneted$.next(data.user);
          return data;
        }),
        // tslint:disable-next-line:no-shadowed-variable
        catchError(err => {
          throw new Error('Authentification failed : Email or password incorrect!');
        })
      );
  }

  logout() {
    this.http.get(this.logoutUrl);
    localStorage.clear();
    this.conneted$.next(null);
  }

  isAdmin() {
    return userHasRole('ROLE_ADMIN', this.currUser);
  }

  isSuperAdmin() {
    return userHasRole('ROLE_SUPER_ADMIN', this.currUser);
  }

  isCheffeur() {
    return userHasRole('DRIVER', this.currUser);
  }

  get user() {
    return this.currUser;
  }

  userConnected(): Observable<IUser> {
    return this.conneted$.asObservable();
  }
}
