import { Component, input, output, computed, inject, effect, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

import { DynamicFormRawValue, FormFieldConfig, FormValue } from '@core/_models/forms/form.model';
import { GenericInputComponent } from '@shared/components/generic-input/generic-input.component';
import { MainButtonComponent } from '@shared/components/button/main-button.component';

@Component({
  selector: 'dynamic-form',
  imports: [
    ReactiveFormsModule,
    GenericInputComponent,
    MainButtonComponent
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DynamicFormComponent {

  private readonly fb = inject(FormBuilder);

  readonly fields = input.required<FormFieldConfig[]>();
  readonly isRegisterMode = input<boolean>(false);
  readonly isLoading = input<boolean>(false);

  readonly submitted = output<DynamicFormRawValue>();
  readonly cancelled = output<void>();

  protected form: FormGroup = this.fb.group({});

  // ConfirmPassword and UserName ONLY appears if isRegisterMode is TRUE
  protected readonly visibleFields = computed(() => {
    const REGISTER_ONLY_FIELDS = ['confirmPassword', 'username'];

    return this.fields().filter(f =>
      !REGISTER_ONLY_FIELDS.includes(f.name) || this.isRegisterMode()
    );
  });

  constructor() {
    // Dynamic initialization of controls
    effect(() => {
      const FIELDS = this.fields();
      FIELDS.forEach(f => {
        if (!this.form.contains(f.name)) {
          // Apply the configuration validators
          this.form.addControl(f.name, new FormControl(f.initialValue || '', {
            validators: f.validators || []
          }));
        }
      });
    });
  }

  patchEmail(email: string): void {
    const emailControl = this.form.get('email');
    if (emailControl) {
      emailControl.setValue(email);
    }
  }

  resetForm(): void {
    this.form.reset();
  }

  protected getControl(name: string): FormControl<FormValue> {
    return this.form.get(name) as FormControl<FormValue>;
  }

  protected onSubmit(): void {
    if (this.form.valid) {
      this.submitted.emit(this.form.getRawValue() as DynamicFormRawValue);
    }
    else {
      this.form.markAllAsTouched();
    }
  }
}
