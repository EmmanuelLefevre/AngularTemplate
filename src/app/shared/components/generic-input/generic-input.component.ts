import { Component, input, signal, computed } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FormFieldConfig } from '@core/_models/forms/form.model';

@Component({
  selector: 'app-generic-input',
  imports: [
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './generic-input.component.html',
  styleUrl: './generic-input.component.scss'
})

export class GenericInputComponent {

  readonly id = input.required<string>();
  readonly label = input.required<string>();
  readonly control = input.required<FormControl>();
  readonly type = input<string>('text');
  readonly placeholder = input<string>('');
  readonly className = input<string>('');
  readonly behaviors = input<FormFieldConfig['behaviors']>();

  protected showPassword = signal(false);
  protected isPassword = computed(() => this.type() === 'password');
  protected inputType = computed(() =>
    (this.isPassword() && this.showPassword()) ? 'text' : this.type()
  );

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }
}
