import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:1337/login';  // URL to web api
  private user: any;

  constructor(private http: HttpClient, private router: Router) { }

  login(login, password): Observable<any> {
    return this.http.post<any>(this.authUrl, { 'password': password, 'username': login })
      .pipe(
        map(data => {
          this.user = data;
           this.router.navigate(['/ride']);
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

  isAuth(): boolean {
    return this.user ? true : false;
  }
}


export const AUTH_PROVIDERS = [{ provide: AuthService, useClass: AuthService }];
