import { Directive, ElementRef, afterNextRender, inject } from '@angular/core';

@Directive({
  selector: '[inputFocus]'
})
export class InputFocusDirective {
  private readonly EL = inject(ElementRef);

  constructor() {
    afterNextRender(() => {
      this.executeFocus();
    });
  }

  private executeFocus(): void {
    const ROOT_ELEMENT = this.EL.nativeElement;

    // Check if element has Shadow DOM
    const SHADOW_ROOT = ROOT_ELEMENT.shadowRoot;

    if (SHADOW_ROOT) {
      // Look for input or textarea inside Shadow DOM
      const SHADOW_INPUT = SHADOW_ROOT.querySelector('input, textarea') as
        | HTMLInputElement
        | HTMLTextAreaElement
        | null;

      if (SHADOW_INPUT) {
        SHADOW_INPUT.focus();

        // Exit if Shadow DOM input has been found
        return;
      }
    }

    // If no Shadow DOM, look for in native DOM
    const IS_INPUT = ROOT_ELEMENT instanceof HTMLInputElement || ROOT_ELEMENT instanceof HTMLTextAreaElement;

    if (IS_INPUT) {
      ROOT_ELEMENT.focus();
    }
    // Look for child inputs or textareas
    else {
      const CHILD_INPUT = ROOT_ELEMENT.querySelector('input, textarea') as
        | HTMLInputElement
        | HTMLTextAreaElement
        | null;
      CHILD_INPUT?.focus();
    }
  }
}
