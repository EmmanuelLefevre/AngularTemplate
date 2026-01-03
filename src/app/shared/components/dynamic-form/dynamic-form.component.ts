import { Component, input, output, computed, inject, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { DynamicFormRawValue, FormFieldConfig } from '@core/_models/forms/form.model';
import { GenericInputComponent } from '@shared/components/generic-input/generic-input.component';
import { MainButtonComponent } from '@shared/components/button/main-button.component';

@Component({
  selector: 'app-dynamic-form',
  imports: [
    ReactiveFormsModule,
    GenericInputComponent,
    MainButtonComponent
  ],
  templateUrl: './dynamic-form.component.html'
})

export class DynamicFormComponent {
  private readonly fb = inject(FormBuilder);

  readonly fields = input.required<FormFieldConfig[]>();
  readonly isRegisterMode = input<boolean>(false);
  readonly isLoading = input<boolean>(false);

  readonly submitted = output<DynamicFormRawValue>();
  readonly cancelled = output<void>();

  protected form: FormGroup = this.fb.group({});

  // ConfirmPassword ONLY appears if isRegisterMode is TRUE
  visibleFields = computed(() => {
    return this.fields().filter(f =>
      f.name !== 'confirmPassword' || this.isRegisterMode()
    );
  });

  constructor() {
    // Dynamic initialization of controls
    effect(() => {
      this.fields().forEach(f => {
        if (!this.form.contains(f.name)) {
          this.form.addControl(f.name, new FormControl(f.initialValue || ''));
        }
      });
    });
  }

  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }
}
