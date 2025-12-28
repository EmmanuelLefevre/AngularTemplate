import { Directive, ElementRef, EventEmitter, HostListener, inject, Output } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[inputUpperCase]'
})

export class InputUppercaseDirective {
  private readonly el = inject(ElementRef);
  private readonly control = inject(NgControl);

  @Output() readonly ngModelChange = new EventEmitter();

  @HostListener('input')
  onInput(): void {
    const VALUE = this.control.value;

    if (VALUE) {
      const TRANSFORMED_TEXT = this.inputUppercase(VALUE);

      // View update (DOM)
      this.el.nativeElement.value = TRANSFORMED_TEXT;

      // Changes notification
      this.ngModelChange.emit(TRANSFORMED_TEXT);

      // Update model (FormControl)
      this.control.control?.setValue(TRANSFORMED_TEXT, { emitEvent: false });
    }
  }

  inputUppercase(text: string): string {
    return text.toUpperCase();
  }
}
