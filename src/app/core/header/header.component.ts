import { Component, OnInit } from '@angular/core';
import { IUser, userHasRole } from '@core/interfaces/user.interface';
import { AuthService } from '@core/services/auth/auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'dc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  showAdminSubMenu = false;
  showProfileSubMenu = false;
  connectedUser: IUser;
  isSuperAdmin: boolean;

  ngOnInit() {
    this.connectedUser = this.authService.user ;
    this.isSuperAdmin = this.authService.isSuperAdmin();
   }


  showAdminMenu() {
    this.showAdminSubMenu = !this.showAdminSubMenu;
    this.showProfileSubMenu = false;
  }

  showprofileMenu() {
    this.showProfileSubMenu = !this.showProfileSubMenu;
    this.showAdminSubMenu = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
