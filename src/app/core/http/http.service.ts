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
    this.actionUrl = HOST  + endPoint + '/';
  }


  getAll(options?: { page?: number, limit?: number, order?: any, where?: any }): Observable<T[]> {
    const params = new HttpParams();

    // if(page)
    if (options && options.where) {
      params.set('where', options.where);
    }

    return this.http.get<T[]>(this.actionUrl, { params });
  }

  get(idItem: ID): Observable<T> {
    return this.http.get<T>(this.actionUrl + idItem);
  }

  delete(id: ID): Observable<T> {
    return this.http.delete<T>(this.actionUrl + id);
  }

  create(item: T): Observable<T> {
    console.log('item', item);
    return this.http.post<T>(this.actionUrl, item);
  }

  update(itemToUpdate: T, id: ID): Observable<T> {
    return this.http.put<T>(this.actionUrl + id, itemToUpdate);
  }
}
