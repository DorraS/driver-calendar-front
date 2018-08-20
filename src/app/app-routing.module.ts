import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: './modules/admin/admin.module#AdminModule',
    // canActivate: [AuthGuard]
  },
  {
     path: 'calendar',
    loadChildren: './modules/driver-calendar/diver-calendar.module#DiverCalendarModule',
    // canActivate: [AuthGuard]
  },

  // otherwise redirect to home
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: '**', resolve: {}, redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
