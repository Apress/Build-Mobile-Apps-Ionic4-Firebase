import { Pro } from '@ionic/pro';
import { ErrorHandler, Injectable } from '@angular/core';

Pro.init('792d5544', {
  appVersion: '1.0.0'
});

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    console.error(err);
    Pro.monitoring.handleNewError(err);
  }
}
