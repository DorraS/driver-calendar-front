import { Injectable, ErrorHandler } from '@angular/core';
import { NotificationService } from '@core/services/notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorsHandler implements ErrorHandler {

  constructor(private notifationService: NotificationService) { }

  handleError(error: Error) {
    console.log('handle', error);
    this.notifationService.notify({message: error.message, type: 'danger'});
  }
}
