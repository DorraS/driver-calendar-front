import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/guards/auth/auth.guard';
import { LoginComponent } from '@core/login/login.component';

const routes: Routes = [
  {
    // lazy loading admin module
    path: 'admin',
    loadChildren: './modules/admin/admin.module#AdminModule',
    canActivate: [AuthGuard]
  },
  {
    // lazy loading calendar module
    path: 'calendar',
    loadChildren: './modules/driver-calendar/diver-calendar.module#DiverCalendarModule',
    canActivate: [AuthGuard]
  },

  {
  // authentification route
  path: 'login',
   component: LoginComponent
  },
  // otherwise redirect to home
  { path: '', pathMatch: 'full', redirectTo: 'calendar' },
  { path: '**', redirectTo: 'calendar' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
