import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo',
})

export class YesNoPipe implements PipeTransform {

  private readonly LABELS: Record<string, string> = {
    'true': 'Oui',
    'false': 'Non'
  };

  transform(value: boolean): string {
    return this.resolveLabel(value);
  }

  private resolveLabel(value: boolean): string {
    return this.LABELS[String(value)] ?? this.LABELS['false'];
  }
}
