import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '@core/services/auth/auth.service';

export interface Field<KEY, LABEL> {
  key: any;


}
@Component({
  selector: 'dc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent  implements OnInit {

  title = 'driver-calendar-front';
  connected = false;

  constructor(private authService: AuthService) {

  }


  ngOnInit(): void {
    this.authService.isConnected().subscribe(connected =>  this.connected =  connected);
  }


}
