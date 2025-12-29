import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alert',
})

export class AlertPipe implements PipeTransform {

  private readonly LABELS: Record<string, string> = {
    'true': 'Alerte !',
    'false': '-'
  };

  transform(hasAlert: boolean): string {
    return this.resolveLabel(hasAlert);
  }

  private resolveLabel(value: boolean): string {
    return this.LABELS[String(value)] ?? this.LABELS['false'];
  }
}
