import { IUser } from '@core/interfaces/user.interface';
import { RideService } from '@core/services/ride/ride.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IDriverModelCommon } from '@core/interfaces/role.interface';

export interface IRide extends IDriverModelCommon {

    departureDate: Date;

    comment: string;

    estimate: any; // estimation de la cours :  durée, distance ( recupérer de google) et prix calculer en local

    departureAdress: any;

    arrivalAddress: any;

    driver: IUser;

    customer: IUser;

    rideType: IRideType;

    status: string;
}


export interface IRideType {
    id?: number;
    code: string;
    label: string;
}


export function getRidFormConfig(ride: IRide, service?: RideService) {
    return {
        departureDate: [ride && ride.departureDate || new Date().toISOString(), [Validators.required]],
        departureAdress: [ride && ride.departureAdress && ride.departureAdress, [Validators.required]],
        arrivalAddress: [ride && ride.arrivalAddress && ride.arrivalAddress, [Validators.required]],
        customer: [ride && ride.customer, [Validators.required]],
        rideType: [ride && ride.rideType, [Validators.required]],
        driver: [ride && ride.driver ],
        comment: [ride && ride.comment ],
        estimate: [ride && ride.estimate]
    };
}


export let getRideForm = (ride: IRide): FormGroup => {
    return new FormBuilder().group(
        Object.assign(
            getRidFormConfig(ride)
        )
    );
};

export const RIDE_PRICE: { [codeRode: string]: {[nj: string]: number}} = {
    'RIDE_NORMAL_SINGLE' : {
      'NIGHT' : 1.72,
      'DAY': 0.86
    } ,
    'RIDE_NORMAL_ROUND_TRIP' : {
      'NIGHT' : 2.43,
      'DAY': 1.21
    }
};

