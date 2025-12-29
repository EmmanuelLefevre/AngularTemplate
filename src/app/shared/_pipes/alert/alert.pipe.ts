import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alert',
})

export class AlertPipe implements PipeTransform {

  private readonly ALERT_TEXT = 'Alerte !';
  private readonly DEFAULT_TEXT = '-';

  transform(hasAlert: boolean): string {
    return hasAlert ? this.getAlertLabel() : this.getDefaultLabel();
  }

  private getAlertLabel(): string {
    return this.ALERT_TEXT;
  }

  private getDefaultLabel(): string {
    return this.DEFAULT_TEXT;
  }
}
