import { Injectable, Injector, ApplicationRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { scan, publishReplay, refCount, map } from 'rxjs/operators';

const initNotifications: Notification[] = [];
type IMessagesOperation = (messages: Notification[]) => Notification[];

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  newNotification: Subject<Notification> = new Subject<Notification>();
  deleteNotification: Subject<Number> = new Subject<Number>();

  messages: Observable<Notification[]>;
  updates: Subject<any> = new Subject<any>();

  notification: Subject<any> = new BehaviorSubject(null);

  create: Subject<Notification> = new Subject<Notification>();
  delete: Subject<Number> = new Subject<Number>();
  appRef: any;

  constructor(injector: Injector) {
    this.appRef = injector.get(ApplicationRef);

    this.messages = this.updates.pipe(
      scan((messages: Notification[],
        operation: IMessagesOperation) => {
        return operation(messages);
      }, initNotifications),
      publishReplay(1),
      refCount());

    this.create.pipe(
      map(function (message: Notification): IMessagesOperation {
        return (messages: Notification[]) => {
          return messages.concat(message);
        };
      }))
      .subscribe(this.updates);

    this.delete.pipe(
      map(function (index: number): IMessagesOperation {
        return (messages: Notification[]) => {
            messages.splice(index, 1);
            return messages;
        };
      })
    ).subscribe(this.updates);

    this.newNotification.subscribe(this.create);

    this.deleteNotification.subscribe(this.delete);
  }

  private notify(message: any) {
    // console.log('notify', message);
    this.newNotification.next(message);
    setTimeout(() => this.appRef.tick(), 500);
  }

  error(message: string ) {
    const error: any = {message: message, type: 'danger'};
     this.notify(error);
  }

  succes(message: string ) {
    const succes: any = {message: message, type: 'success'};
     this.notify(succes);
  }

  warnig(message: string ) {
    const succes: any = {message: message, type: 'warning'};
     this.notify(succes);
  }

  deleteNotif(index: number) {
    this.deleteNotification.next(index);
    setTimeout(() => this.appRef.tick(), 500);
  }



}
