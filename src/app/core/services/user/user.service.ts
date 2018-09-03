import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '@core/interfaces/user.interface';
import { HttpService } from '@core/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService<IUser, number> {

  constructor(public http: HttpClient) {
    super(http, 'user');
  }

 /**
   *  chercher l'utilisateur avec la même adresse mail
   *  @param phoneNumber
   *  @param userId: id de l'utilisateur l'utlisation en cas de modification
   *              pour vérifier s'il n'existe pas un autre utilisateur
   *              avec la même adresse mail
   */
  getUserByEmail(email: String, userId?: number): Observable<IUser[]> {
    const where: any = userId ? {
      email,
      id: {'!=': userId }
    } : {email};
    return this.getAll({ where });
  }

  /**
   *  Verifier s'il existe un utilisateur existe par numéro de téléphone
   *  @param phoneNumber
   *  @param userId: id de l'utilisateur en cour de l'utlisation en cas de modification
   *              pour vérifier s'il n'existe pas un autre utilisateur
   *              avec le le même numéro de téléphone
   */
  getUserByPhoneNumber(phoneNumber: string , userId?: number): Observable<IUser[]> {
    const where = userId ? {
       'phoneNumber' : { 'contains': phoneNumber.replace('+', '') },
       id: {'!=': userId}
    } : {phoneNumber} ;
    return this.getAll({ where });
  }

}
