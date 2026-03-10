import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

import { SnackbarComponent } from '../../../shared/components/snackbar/snackbar.component';
import { SnackbarType, SnackbarData } from '@core/_models/snackbar/snackbar.model';

@Injectable({
  providedIn: 'root'
})

export class SnackbarService {

  private readonly snackbar = inject(MatSnackBar);
  private readonly translateService = inject(TranslateService);

  showNotification(displayMessage: string, messageType: SnackbarType, translateParams?: Record<string, unknown>): void {
    const modifierClass = `snackbar-container--${messageType}`;

    const translatedMessage = this.translateService.instant(displayMessage, translateParams);

    const config: MatSnackBarConfig = {
      panelClass: [modifierClass],
      data: { message: translatedMessage, type: messageType } as SnackbarData
    };

    switch (messageType) {
      case 'logIn-logOut':
        config.duration = 7000;
        config.verticalPosition = 'top';
        config.horizontalPosition = 'end';
        config.politeness = 'polite';
        break;

      case 'register':
      case 'orange-alert':
      case 'red-alert':
        config.duration = 7000;
        config.verticalPosition = 'top';
        config.horizontalPosition = 'end';
        config.politeness = 'assertive';
        break;

      case 'created':
      case 'modified':
      case 'deleted':
      default:
        config.duration = 7000;
        config.verticalPosition = 'bottom';
        config.horizontalPosition = 'start';
        config.politeness = 'polite';
        break;
    }

    this.snackbar.openFromComponent(SnackbarComponent, config);
  }
}
