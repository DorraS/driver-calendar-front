import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@shared/directives/notification/notification.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass']
})
export class NotificationComponent implements OnInit {

  showNotification: boolean;
  notificationMsg: any;
  notification: any;

  constructor(public notifServ: NotificationService) {
    this.notification = this.notifServ.messages;
  }

  ngOnInit() {
  }

  closeNotification(index: number) {
    this.notifServ.deleteNotif(index);
  }

}
