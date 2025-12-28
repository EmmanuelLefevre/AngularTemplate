import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alert',
})

export class AlertPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Alerte !' : '-';
  }
}
