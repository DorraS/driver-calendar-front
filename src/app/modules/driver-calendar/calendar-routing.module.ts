import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverCalendarComponent } from '@modules/driver-calendar/pages/driver-calendar/driver-calendar.component';
import { RideItemComponent } from '@modules/driver-calendar/components/ride-item/ride-item.component';
import { CalendarComponent } from '@modules/driver-calendar/components/calendar/calendar.component';
import { RideDetailComponent } from '@modules/driver-calendar/components/ride-detail/ride-detail.component';
import { RideResolver } from '@modules/driver-calendar/components/resolvers/ride.resolver';

const routes: Routes = [{
  path: '',
  component: DriverCalendarComponent,
  // canActivateChild: [AuthGuard],
  children: [
    {
      path: '',
      children: [

        { path: '', component: CalendarComponent,
       },
        {
          path: 'ride',
          children: [
            {
              path: 'create',
              component: RideDetailComponent,
              /* data: {
                  rights: ['EDIT_USER_INFO']
              } */
            },
            {
              path: ':id',
              component: RideItemComponent,
              resolve: { ride: RideResolver },
              children: [
                { path: '', redirectTo: 'view', pathMatch: 'full' },
                {
                  path: 'view',
                  component: RideDetailComponent,
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
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
