import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RideService } from '@core/services/ride/ride.service';
import { ActivatedRoute } from '@angular/router';
import { IRide, getRideForm } from '@core/interfaces/ride';
import { Observable } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { GooglePlaceService } from '@shared/services/google-place.service';
import { UserService } from '@core/services/user/user.service';
import { IUser } from '@core/interfaces/user.interface';

@Component({
  selector: 'dc-ride-detail',
  templateUrl: './ride-detail.component.html',
  styleUrls: ['./ride-detail.component.sass'],
})
export class RideDetailComponent implements OnInit {

  form: FormGroup;
  search = (text$: Observable<string>): Observable<string[]> =>
    text$.pipe(
      filter((searchText: string) => searchText.trim().length > 1),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => this.googleService.findPlacesPropositons(term))
    )

  searchUser = (text$: Observable<string>): Observable<IUser[]> =>
    text$.pipe(
      filter((searchText: string) => searchText.trim().length > 3),
      debounceTime(200),
      distinctUntilChanged(),
      map<string, any>(data => {
        if (/^\+?[0-9]*$/.test(data)) {
          return {
            phoneNumber: data,
            socialSecurityNumber: +data
          } as IUser;
        } else if (/.*@.{2,}\..*/.test(data)) {
          return {
            email: data
          } as IUser;
        }
        return { lastName: data, email: data } as IUser;
      }),
      switchMap(term => this.userService.getAll({ where: term, order: 'lastName' }))
    )

  formatter = (result: IUser) => result.firstName + result.lastName;

  constructor(private rideService: RideService,
    private userService: UserService,
    private googleService: GooglePlaceService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    const snapshotRide: any = this.route.parent.snapshot.data.ride;

    this.form = getRideForm(snapshotRide as IRide);

    console.log('form', this.form);
  }

  submit() {
    this.rideService.create(this.form.value).subscribe();
  }

}
