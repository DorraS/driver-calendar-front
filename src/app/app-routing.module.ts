import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/guards/auth/auth.guard';
import { LoginComponent } from '@core/login/login.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: './modules/admin/admin.module#AdminModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'calendar',
    loadChildren: './modules/driver-calendar/diver-calendar.module#DiverCalendarModule',
    canActivate: [AuthGuard]
  },
  {
  path: 'login',
   component: LoginComponent
  },
  // otherwise redirect to home
  { path: 'home', redirectTo: 'calendar' },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', resolve: {}, redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
