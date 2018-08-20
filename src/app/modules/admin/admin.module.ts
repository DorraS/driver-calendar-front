import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from '@modules/admin/admin-routing.module';
import { UserItemComponent } from './user/user-item/user-item.component';
import { AdminComponent } from '@modules/admin/pages/admin/admin.component';
import { UserListComponent } from '@modules/admin/user/user-list/user-list.component';
import { UserDetailComponent } from '@modules/admin/user/user-detail/user-detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialConfigModule } from '@shared/material-config/material-config.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialConfigModule
  ],
  declarations: [AdminComponent, UserItemComponent, UserListComponent, UserDetailComponent]
})
export class AdminModule { }
