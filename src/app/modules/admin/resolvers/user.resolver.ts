import { Injectable, Injector } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Location } from '@angular/common';
import { IUser } from '@core/interfaces/user.interface';
import { Observable } from 'rxjs';
import { UserService } from '@core/services/user/user.service';
import { take, map } from 'rxjs/operators';


@Injectable()
export class UserResolver implements Resolve<IUser> {
    constructor(
        private userService: UserService,
        private router: Router,
        private location: Location) {
    }


    resolve(route: ActivatedRouteSnapshot): Observable<IUser> | IUser {

        const id = +route.paramMap.get('id');

        return this.userService.get(id).pipe(
          map(user  => {
            if (user) {
              console.log(user);
              return user;
            } else { // id not found
              this.router.navigate(['user']);
              return null;
            }
          })
        );
    }
}
