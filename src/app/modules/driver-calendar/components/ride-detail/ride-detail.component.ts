import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RideService } from '@core/services/ride/ride.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IRide, getRideForm, IRideType } from '@core/interfaces/ride';
import { Observable } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { GoogleService, Place } from '@shared/services/google.service';
import { UserService } from '@core/services/user/user.service';
import { IUser } from '@core/interfaces/user.interface';
import { TyperideService } from '@core/services/ride/typeride.service';

@Component({
  selector: 'dc-ride-detail',
  templateUrl: './ride-detail.component.html',
  styleUrls: ['./ride-detail.component.sass'],
})
export class RideDetailComponent implements OnInit {

  estimationRide;
  form: FormGroup;
  typeRide$: Observable<IRideType[]>;
  currentRide: IRide;

  /* search adress with google place*/
  search = (text$: Observable<Place>): Observable<Place[]> =>
    text$.pipe(
      filter((searchText: string) => searchText.trim().length > 1),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => this.googleService.findPlacesPropositons(term))
    )

  /* search user */
  searchUser = (text$: Observable<string>): Observable<IUser[]> =>
    text$.pipe(
      filter((searchText: string) => searchText.trim().length > 3),
      debounceTime(200),
      distinctUntilChanged(),
      map<string, any>(data => {
        if (/^\+?[0-9]*$/.test(data)) {
          return {
            or: [
              { phoneNumber: { contains: data } },
              { socialSecurityNumber: { contains: data } },
            ]
          };
        } else if (/.*@.{2,}\..*/.test(data)) {
          return {
            email: { contains: data }
          };
        }
        return { or: [{ lastName: { contains: data } }, { email: { contains: data } }] };
      }),
      switchMap(term => this.userService.getAll({ where: term }))
    )

  formatterUser = (result: IUser) => result ? `${result.firstName} ${result.lastName}` : '';

  formatter = (result: Place) => result.description;

  constructor(private rideService: RideService,
    private userService: UserService,
    private googleService: GoogleService,
    private typeRideSerive: TyperideService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const snapshotRide: any = this.route.parent.snapshot.data.ride;
    this.currentRide = snapshotRide;
    this.form = getRideForm(this.currentRide);
    this.typeRide$ = this.typeRideSerive.getAll();
    console.log('form', this.form);
  }

  submit() {
    console.log(this.form);

    const ride: IRide = { ...this.form.value };

    ride.customer = this.form.value.customer.id;
    ride.driver = this.form.value.driver.id;
    ride.rideType = this.form.value.rideType.id;
    const actionSaveOrUpdate = this.currentRide ? this.rideService.update(ride, this.currentRide.id) :
      this.rideService.create(ride);
    actionSaveOrUpdate.subscribe(newRide => this.router.navigate(['calendar']));
  }

  calculer(parms: any) {
    this.googleService.
      estimateRide(
        this.form.controls.arrivalAddress.value,
        this.form.controls.departureAdress.value,
        this.form.controls.departureDate.value
      ).subscribe(data => {
        this.estimationRide = data;
        this.form.value.estimate = this.estimationRide;
      });
  }


  deleteRide() {
    this.rideService.delete(this.currentRide.id).subscribe(this.router.navigate['calendar']);
  }

}
