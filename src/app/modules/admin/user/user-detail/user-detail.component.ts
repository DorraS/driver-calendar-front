import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IRight, IRole } from '@core/interfaces/role.interface';
import { getUserForm, IUser } from '@core/interfaces/user.interface';
import { RightService } from '@core/services/user/right.service';
import { RoleService } from '@core/services/user/role.service';
import { UserService } from '@core/services/user/user.service';
import { GoogleService, Place } from '@shared/services/google.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'dc-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {

  userForm: FormGroup;
  currUser: IUser;
  roles$: Observable<IRole[]>;
  rights$: Observable<IRight[]>;

  searchAdress = (text$: Observable<Place>): Observable<Place[]> =>
    text$.pipe(
      filter((searchText: string) => searchText.trim().length > 1),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => this.googleService.findPlacesPropositons(term))
    )

  formatter = (result: Place) => result.description;


  constructor(public userService: UserService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router,
    private rightService: RightService,
    private googleService: GoogleService
  ) {
  }

  ngOnInit() {
    this.currUser = this.route.parent.snapshot.data.user;
    this.userForm = getUserForm(this.currUser as IUser, this.userService);
    this.roles$ = this.roleService.getAll();
    this.rights$ = this.rightService.getAll();
  }


  createUser() {
    console.log(this.userForm);
    if (this.userForm.valid && this.userForm.value) {

      const userTmp: IUser = { ...this.userForm }.value;

      userTmp.rights = this.userForm.value.rights ? this.userForm.value.rights.map(right =>
        right.id) : [];
      userTmp.roles = this.userForm.value.roles ? this.userForm.value.roles.map(role =>
        role.id) : [];
      console.log(userTmp);
      /**
       * bug sails : save un model avec une association many to many
       * sails essaies de sauvgrades l'association et le object principale n'est pas encore créer du coup err undifined
       * our contorner le problème; on sauvgrade l'object pricipale dans notre cas l'utilsateur
       * en suite, on mets à jour les assocaitions dans notre cas les roles et les droits
       * en lancer un  update de l'utilisateur
       */
      let createOrUpdateUser: Observable<IUser>;
      // if selected user not have id is a creation action
      if (!this.currUser) {
        // creation d'un nouveau utilisateur
        const { rights, roles } = userTmp as any;
        delete userTmp.rights;
        delete userTmp.roles;
        createOrUpdateUser = this.userService.create(userTmp).pipe(switchMap(user => this.userService.update({ roles, rights }, user.id)));
      } else {
        // default cas is to update user
        createOrUpdateUser = this.userService.update(this.userForm.value, this.currUser.id);
      }
      createOrUpdateUser.subscribe(user => {
        this.router.navigate(['admin/user', user.id]);
      });

    }
  }

  deleteUser() {
    this.userService.update({ roles: [], rights: [] }, this.currUser.id).pipe(
      switchMap(user => this.userService.delete(user.id) )
    ).subscribe(data => {
      console.log('user deleted ', data);
      this.router.navigate(['admin/user']);
    });
  }

}
