import { NgControl } from '@angular/forms';
import { Directive, ElementRef, EventEmitter, HostListener, inject, Output } from '@angular/core';

const FIRST_CHAR_INDEX = 0;
const NEXT_CHAR_OFFSET = 1;
const NOT_FOUND_INDEX = -1;

@Directive({
  selector: '[inputTitleCase]',
})

export class InputTitleCaseDirective {
  @Output() readonly ngModelChange = new EventEmitter();

  private readonly el = inject(ElementRef);
  private readonly control = inject(NgControl);

  @HostListener('input') onInput(): void {
    const VALUE = this.control.value;

    if (VALUE) {
      const TRANSFORMED_TEXT = this.inputTitleCase(VALUE);

      // Vue update (DOM)
      this.el.nativeElement.value = TRANSFORMED_TEXT;

      // Model update (Angular Forms)
      this.ngModelChange.emit(TRANSFORMED_TEXT);
      this.control.control?.setValue(TRANSFORMED_TEXT, { emitEvent: false });
    }
  }

  inputTitleCase(text: string): string {
    if (!text) return '';

    return text
      .split(' ')
      .map(word => {
        let transformedWord = word;

        // Apostrophes and hyphens management (e.g.: Jean-Luc,  O'Connor)
        transformedWord = this.capitalizeAfterChar(transformedWord, '-');
        transformedWord = this.capitalizeAfterChar(transformedWord, '\'');

        // Capitalize first letter
        return transformedWord.charAt(FIRST_CHAR_INDEX).toUpperCase() +
          transformedWord.slice(NEXT_CHAR_OFFSET);
      })
      .join(' ');
  }

  private capitalizeAfterChar(word: string, char: string): string {
    const INDEX = word.indexOf(char);

    // Using named constants (no variable assigned to object injection)
    if (INDEX !== NOT_FOUND_INDEX && INDEX < word.length - NEXT_CHAR_OFFSET) {
      const NEXT_INDEX = INDEX + NEXT_CHAR_OFFSET;

      return word.substring(FIRST_CHAR_INDEX, NEXT_INDEX) +
        word.charAt(NEXT_INDEX).toUpperCase() +
        word.substring(NEXT_INDEX + NEXT_CHAR_OFFSET);
    }
    return word;
  }
}
