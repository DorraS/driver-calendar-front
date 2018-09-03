import { Injectable } from '@angular/core';
import { HttpService } from '@core/http/http.service';
import { HttpClient } from '@angular/common/http';
import { IRole } from '@core/interfaces/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService  extends HttpService<IRole, number> {

  constructor(http: HttpClient) {
    super(http, 'role');
   }
}
