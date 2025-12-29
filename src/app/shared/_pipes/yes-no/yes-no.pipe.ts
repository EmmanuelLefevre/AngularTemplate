import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo',
})

export class YesNoPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? this.getYesLabel() : this.getNoLabel();
  }

  private getYesLabel(): string {
    return 'Oui';
  }

  private getNoLabel(): string {
    return 'Non';
  }
}
