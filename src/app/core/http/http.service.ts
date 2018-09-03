import { Injectable, Host } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export const HOST = '/api/';


/**
 *  Http service est un service generic pour gerenr les appels CRUD vers le back-end (api)
 * T: type de l'entity comme User , RIde ;...
 * ID : type de l'id de l'entity comme number , string
 */
export class HttpService<T, ID> {

  actionUrl: string;

  constructor(public http: HttpClient, endPoint: string) {
    this.actionUrl = HOST + endPoint + '/';
  }


  getAll(options?: { page?: number, limit?: number, order?: any, where?: any }): Observable<T[]> {
    let params;

    // if(page)
    if (options && options.where) {
      params = {'where': JSON.stringify(options.where)};
    }
     console.log(params);
    return this.http.get<T[]>(this.actionUrl, { params });
  }

  get(idItem: ID): Observable<T> {
    return this.http.get<T>(this.actionUrl + idItem);
  }

  delete(id: ID): Observable<T> {
    return this.http.delete<T>(this.actionUrl + id);
  }

  create(item: T): Observable<T> {
    Object.keys(item).forEach(key => item[key] === null && delete item[key]);
    return this.http.post<T>(this.actionUrl, item);
  }

  update(itemToUpdate: T, id: ID): Observable<T> {
    Object.keys(itemToUpdate).forEach(key => itemToUpdate[key] === null && delete itemToUpdate[key]);
    return this.http.patch<T>(this.actionUrl + id, itemToUpdate);
  }
}
