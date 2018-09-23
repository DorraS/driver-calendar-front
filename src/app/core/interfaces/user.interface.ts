import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRight, IDriverModelCommon, IRole } from '@core/interfaces/role.interface';
import { UserService } from '@core/services/user/user.service';


export interface IUser extends IDriverModelCommon {
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    password?: string;
    phoneNumber?: string;
    socialSecurityNumber?: number;
    city?: string;
    zip?: number;
    roles?: IRole[];
    rights?: IRight[];
    color?: string;
}

export const USER_TABLE_TEMPLATE: any[] = [
    { key: 'firstName', title: 'First name' },
    { key: 'lastName', title: 'Last name' },
    { key: 'email', title: 'Email Adress' },
    { key: 'phoneNumber', title: 'Phone number' },
    { key: 'socialSecurityNumber', title: 'Social Security Number' },
];

export type AsyncValidatorFn = (c: AbstractControl) => Observable<ValidationErrors | null>;

export function existingEmailValidator(userService: UserService, userId: number): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return userService.getUserByEmail(control.value, userId).pipe(
            map(
                user => {
                    return (user.length > 0) ? { 'emailExists': true } : null;
                }
            )
        );
    };

}

export function existingPhoneNumberValidator(userService: UserService, userId: number): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return userService.getUserByPhoneNumber(control.value, userId).pipe(
            map(
                users => {
                    console.log(users);
                    return (users.length > 0 ) ? { 'phoneNumberExists': true } : null;
                }
            )
        );
    };

}

export function getUserConfig(user: IUser, service: UserService, creation: boolean = true) {
    console.log('form user', user);
    return {
        firstName: [user && user.firstName, [Validators.required]],
        lastName: [user && user.lastName, [Validators.required]],
        email: [user && user.email, [Validators.required, Validators.email], existingEmailValidator(service, user && user.id )],
        password: [user && user.password || undefined ],
        phoneNumber: [user && user.phoneNumber , Validators.required, existingPhoneNumberValidator(service, user && user.id)],
        socialSecurityNumber: [user && user.socialSecurityNumber || undefined],
        address: [user && user.address],
        roles: [user && user.roles || [], Validators.required],
        rights: [user && user.rights || []],
        color: [user && user.color],
    };
}

export let getUserForm = (user: IUser, service: UserService): FormGroup => {
    return new FormBuilder().group(
        Object.assign(
            getUserConfig(user, service)
        )
    );
};

export let userHasRole =  (codeRole: string, user: IUser): boolean => {
     return user.roles.filter(role => role.code === codeRole).length > 0;
};
