import { IUser } from '@core/interfaces/user.interface';
import { RideService } from '@core/services/ride/ride.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

export interface IRide {

    departureDate: string;

    comment: string;

    duration: number; // durée de la course en mn

    distance: number; // distance de la course en KM

    estimatePrice: number; // cout de la course en euro

    departureAdress: string;

    arrivalAddress: string;

    driver: IUser;

    customer: IUser;

    status: string;

    typeRide: string;
}


export function getRidFormConfig(ride: IRide, service?: RideService) {
    return {
        departureDate: [ride && ride.departureDate || new Date().toISOString(), [Validators.required]],
        departureAdress: [ride && ride.departureAdress || '', [Validators.required]],
        arrivalAddress: [ride && ride.arrivalAddress || '', [Validators.required]],
        customer: [ride && ride.customer || '', [Validators.required]],
        typeRide: [ride && ride.typeRide || '', [Validators.required]],
        driver: [ride && ride.driver || ''],
        comment: [ride && ride.comment || ''],
        duration: [ride && ride.duration || 0],
        distance: [ride && ride.distance || 0],
        estimatePrice: [ride && ride.estimatePrice || 0],
    };
}


export let getRideForm = (ride: IRide): FormGroup => {
    return new FormBuilder().group(
        Object.assign(
            getRidFormConfig(ride)
        )
    );
};
