import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
export type ButtonType = 'button' | 'submit' | 'reset' | 'link';

const FIRST_TAB_INDEX = 0;

@Component({
  selector: 'main-button',
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './main-button.component.html',
  styleUrl: './main-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MainButtonComponent {
  // --- INPUTS ---
  readonly label = input<string>('');
  readonly type = input<ButtonType>('button');
  readonly variant = input<ButtonVariant>('primary');
  readonly link = input<string | (string | number)[] | null>(null);
  readonly isDisabled = input<boolean>(false);
  readonly isLoading = input<boolean>(false);
  readonly icon = input<string | null>(null);

  // --- ACCESSIBILITY (A11Y) ---
  readonly ariaLabel = input<string | null>(null);
  readonly ariaExpanded = input<boolean | null>(null);
  readonly ariaControls = input<string | null>(null);
  readonly tabIndex = input<number>(FIRST_TAB_INDEX);

  // --- OUTPUTS ---
  readonly clicked = output<MouseEvent | KeyboardEvent>();
  readonly escaped = output<void>();
  readonly spaced = output<void>();


  /**
   * Click manager
   */
  protected onHandleClick(event: Event): void {
    if (this.isDisabled() || this.isLoading()) return;

    // Cast event for the output
    this.clicked.emit(event as MouseEvent);
  }

  /**
   * Keyboard manager
   */
  protected onHandleKeydown(event: Event): void {
    if (this.isDisabled() || this.isLoading()) return;

    const KEYBOARD_EVENT = event as KeyboardEvent;

    if (KEYBOARD_EVENT.key === 'Escape') {
      this.escaped.emit();
    }

    // "Space" and "Enter" behavior is native to <button>,
    // but on an <a> link acting as a button, it sometimes needs to be forced
    if (KEYBOARD_EVENT.key === ' ') {
      if (this.type() === 'link') {
        // Avoid page scrolling
        KEYBOARD_EVENT.preventDefault();
      }
      this.spaced.emit();
    }

    if (KEYBOARD_EVENT.key === 'Enter') {
      this.clicked.emit(KEYBOARD_EVENT);
    }
  }
}
