import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, USER_TABLE_TEMPLATE } from '@core/interfaces/user.interface';
import { UserService } from '@core/services/user/user.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'dc-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[];

  _tableTemplate = USER_TABLE_TEMPLATE;

  users$: Observable<IUser[]>;

  constructor(private _userSerice: UserService, private _router: Router) { }

  ngOnInit() {
    this.users$ = this._userSerice.getAll();
    this.displayedColumns = this._tableTemplate.map(columDef => columDef.key);
  }

  showUser(userId) {
    if (userId) {
      this._router.navigate(['admin/user', userId]);
    }
  }

}
