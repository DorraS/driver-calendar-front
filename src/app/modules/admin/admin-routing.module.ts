import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '@modules/admin/pages/admin/admin.component';
import { UserItemComponent } from '@modules/admin/user/user-item/user-item.component';
import { UserResolver } from '@modules/admin/resolvers/user.resolver';
import { UserListComponent } from '@modules/admin/user/user-list/user-list.component';
import { UserDetailComponent } from '@modules/admin/user/user-detail/user-detail.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  // canActivateChild: [AuthGuard],
  children: [
    {
      path: '',
      children: [
        { path: '', redirectTo: 'user', pathMatch: 'full' },
        {
          path: 'user',
          children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            {
              path: 'list',
              component: UserListComponent,
              /* data: {
                  rights: ['DISPLAY_USER_LIST'],
                  displayItem: ['DISPLAY_USER_INFO'],
                  editable: ['EDIT_USER_INFO']
              } */
            },
            {
              path: 'create',
              component: UserDetailComponent,
              /* data: {
                  rights: ['EDIT_USER_INFO']
              } */
            },
            {
              path: ':id',
              component: UserItemComponent,
              resolve: { user: UserResolver },
              children: [
                { path: '', redirectTo: 'view', pathMatch: 'full' },
                {
                  path: 'view',
                  component: UserDetailComponent,
                  // data: {
                  //   rights: ['DISPLAY_USER_INFO'],
                  //   editable: ['EDIT_USER_INFO']
                  // }
                }
              ]
            },
          ]
        }
      ]
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    UserResolver
  ]

})
export class AdminRoutingModule { }


/* import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from '@modules/admin/users/pages/user/user.component';
import { UserListComponent } from '@modules/admin/users/components/user-list/user-list.component';
import { UserDetailComponent } from '@modules/admin/users/components/user-detail/user-detail.component';
import { AdminComponent } from '@modules/admin/pages/admin/admin.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
    {
      path: '',
      component: UserListComponent,
      children: [
          {
          path: ':id',
          component: UserDetailComponent,
          // canDeactivate: [CanDeactivateGuard],
          // resolve: {
          //  //  crisis: CrisisDetailResolver
          // }
        },
        {
          path: 'new',
          component: UserDetailComponent
        }
      ]
    }
  ]
} ];


const routes: Routes = [
  {
      path: '',
      component: AdminComponent,
      canActivateChild: [AuthGuard],
      children: [
          {
              path: '',
              children: [
                  { path: '', redirectTo: 'user', pathMatch: 'full' },
                  {
                      path: 'user',
                      children: [
                          { path: '', redirectTo: 'list', pathMatch: 'full' },
                          {
                              path: 'list',
                              component: UserListComponent,
                              data: {
                                  rights: ['DISPLAY_USER_LIST'],
                                  displayItem: ['DISPLAY_USER_INFO'],
                                  editable: ['EDIT_USER_INFO']
                              }
                          },
                          {
                              path: 'create',
                              component: UserFormComponent,
                              data: {
                                  rights: ['EDIT_USER_INFO']
                              }
                          },
                          {
                              path: ':id',
                              component: UserItemComponent,
                              resolve: { user: UserResolver },
                              children: [
                                  { path: '', redirectTo: 'view', pathMatch: 'full' },
                                  {
                                      path: 'view',
                                      component: UserFormComponent,
                                      data: {
                                          rights: ['DISPLAY_USER_INFO'],
                                          editable: ['EDIT_USER_INFO']
                                      }
                                  }
                              ]
                          },
                      ]
                  },
                  {
                      path: 'group',
                      children: [
                          { path: '', redirectTo: 'list', pathMatch: 'full' },
                          {
                              path: 'list',
                              component: GroupListComponent,
                              data: {
                                  rights: ['DISPLAY_GROUP_LIST'],
                                  displayItem: ['DISPLAY_GROUP_INFO'],
                                  editable: ['EDIT_GROUP_INFO']
                              }
                          },
                          {
                              path: 'create',
                              component: GroupFormComponent,
                              data: {
                                  rights: ['EDIT_GROUP_INFO']
                              }
                          },
                          {
                              path: ':id',
                              component: GroupItemComponent,
                              resolve: { group: GroupResolver },
                              children: [
                                  { path: '', redirectTo: 'view', pathMatch: 'full' },
                                  {
                                      path: 'view',
                                      component: GroupFormComponent,
                                      data: {
                                          rights: ['DISPLAY_GROUP_INFO'],
                                          editable: ['EDIT_GROUP_INFO']
                                      }
                                  },
                              ]
                          }
                      ]
                  },
              ]
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
 */
