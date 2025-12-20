import { Directive, ElementRef, inject, output } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[inputTrim]',
  host: {
    '(focusout)': 'onFocusOut()'
  }
})

export class InputTrimDirective {

  private readonly EL = inject(ElementRef<HTMLInputElement>);
  private readonly CONTROL = inject(NgControl, { optional: true });

  readonly ngModelChange = output<string>();

  onFocusOut(): void {
    const INPUT_ELEMENT = this.EL.nativeElement;
    const TRIMMED_VALUE = INPUT_ELEMENT.value.trim();

    // ONLY update if value has actually changed
    if (INPUT_ELEMENT.value !== TRIMMED_VALUE) {
      // DOM element update
      INPUT_ELEMENT.value = TRIMMED_VALUE;

      // Synchronization with Reactive Form (if present)
      this.CONTROL?.control?.setValue(TRIMMED_VALUE, {
        emitEvent: true,
        onlySelf: true
      });

      // Synchronization with ngModel
      this.ngModelChange.emit(TRIMMED_VALUE);
    }
  }
}
