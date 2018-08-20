import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRight } from '@core/interfaces/role.interface';
import { UserService } from '@core/services/user/user.service';

export enum IUserType {
    'Client',
    'Driver',
    'Admin'
}

export interface IUser {
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    password?: string;
    phoneNumber?: string;
    socialSecurityNumber?: number;
    city?: string;
    zip?: number;
    roles?: IRight[];
    createdAt: Date;
    updatedAt: Date;
}

export const USER_TABLE_TEMPLATE: any[] = [
    { key: 'firstName', title: 'First name' },
    { key: 'lastName', title: 'Lasr name' },
    { key: 'email', title: 'Email Adress' },
    { key: 'phoneNumber', title: 'Phone number' },
    { key: 'socialSecurityNumber', title: 'Social Security Number' },
    { key: 'createdA', title: 'Created at' },
    { key: 'updatedAt', title: 'Modified at' }
];

export type AsyncValidatorFn = (c: AbstractControl) => Observable<ValidationErrors | null>;

export function existingEmailValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return userService.getUserByEmail(control.value).pipe(
            map(
                user => {
                    return (user) ? { 'emailExists': true } : null;
                }
            )
        );
    };

}

export function existingPhoneNumberValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return userService.getUserByPhoneNumber(control.value).pipe(
            map(
                user => {
                    return (user) ? { 'phoneNumberExists': true } : null;
                }
            )
        );
    };

}

export function getUserConfig(user: IUser, service: UserService) {
    console.log('form user', user);
    return {
        firstName: [user && user.firstName || '', [Validators.required, Validators.minLength(4)]],
        lastName: [user && user.lastName || '', [Validators.required, Validators.minLength(4)]],
        email: [user && user.email || '', [Validators.required, Validators.email], existingEmailValidator(service)],
        password: [user && user.password || ''],
        phoneNumber: [user && user.phoneNumber || '', Validators.required, existingPhoneNumberValidator(service)],
        socialSecurityNumber: [user && user.socialSecurityNumber || ''],
        address: [user && user.address || '', Validators.required],
        city: [user && user.city || '', Validators.required],
        zip: [user && user.zip || '', Validators.required],
        roles: [user && user.roles || [], Validators.required]
    };
}

export let getUserForm = (user: IUser, service: UserService): FormGroup => {
    return new FormBuilder().group(
        Object.assign(
            getUserConfig(user, service)
        )
    );
};

