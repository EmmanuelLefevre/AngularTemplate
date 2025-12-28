import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})

export class DateFormatPipe implements PipeTransform {

  transform(value: string): string {
    // Return empty string if input is null/undefined/empty
    if (!value) {
      return '';
    }

    // Convert string into a Date object
    const DATE = new Date(value);

    // Define format option
    const OPTIONS: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };

    // Format date according to French standards
    return DATE.toLocaleDateString('fr-FR', OPTIONS);
  }

}
