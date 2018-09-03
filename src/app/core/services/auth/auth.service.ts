import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = '/api/login';  // URL to web api
  private user: any;
  private conneted$ =  new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  login(login, password): Observable<any> {
    return this.http.post<any>(this.authUrl, { 'password': password, 'username': login })
      .pipe(
        map(data => {
          localStorage.setItem('currUser', JSON.stringify(data));
          this.user = data;
           this.conneted$.next(true);
          return data;
        }),
        // tslint:disable-next-line:no-shadowed-variable
        catchError(err => {
          throw new Error('problem d\'authentification');
        })
      );
  }

  get getUser() {
    return this.user;
  }

  isConnected(): Observable<boolean> {
    return this.conneted$.asObservable();
  }
}


export const AUTH_PROVIDERS = [{ provide: AuthService, useClass: AuthService }];
