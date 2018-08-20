import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services/user/user.service';
import { IUser, getUserForm } from '@core/interfaces/user.interface';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from '@core/login/login.component';

@Component({
  selector: 'dc-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {

  userForm: FormGroup;

  constructor(public userService: UserService, private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {

    const snapshotUser: any = this.route.parent.snapshot.data.user;

    this.userForm = getUserForm(snapshotUser as IUser, this.userService);
  }


  createUser() {
    if (this.userForm.valid && this.userForm.value) {
      this.userService.create({ ...this.userForm.value });
    }
  }

}
