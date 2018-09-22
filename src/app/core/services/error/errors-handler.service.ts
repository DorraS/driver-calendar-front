import { Injectable, ErrorHandler } from '@angular/core';
import { NotificationService } from '@shared/directives/notification/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

const ERROR_MSG: { [code: number]: string } = {
  401: 'Access is denied',
  403: 'Access is denied',
  404: 'Not found'
};

@Injectable({
  providedIn: 'root'
})
export class ErrorsHandler implements ErrorHandler {

  constructor(private notifationService: NotificationService) { }

  handleError(error: Error) {
    let message = 'Unresolved error. Contact Support.';

    if (error instanceof HttpErrorResponse) {
       message =  ERROR_MSG[error.status];
    }
    this.notifationService.error(error.message);
  }
}
