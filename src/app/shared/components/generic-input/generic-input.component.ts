import { Component, input, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FormFieldConfig } from '@core/_models/forms/form.model';

@Component({
  selector: 'generic-input',
  imports: [
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './generic-input.component.html',
  styleUrl: './generic-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GenericInputComponent {

  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly control = input.required<FormControl>();
  readonly type = input<string>('text');
  readonly placeholder = input<string>('');
  readonly className = input<string>('');
  readonly behaviors = input<FormFieldConfig['behaviors']>();

  protected readonly showPassword = signal(false);
  protected readonly isPassword = computed(() => this.type() === 'password');

  protected readonly inputType = computed(() =>
    (this.isPassword() && this.showPassword()) ? 'text' : this.type()
  );

  protected togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  /**
   * Helper to know if we display the error
   */
  protected readonly hasError = computed(() => {
    const CTRL = this.control();
    return CTRL.invalid && (CTRL.dirty || CTRL.touched);
  });
}
