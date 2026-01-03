import { ValidatorFn } from '@angular/forms';

export type FormFieldType = 'email' | 'password' | 'text' | 'tel' | 'number';

// We precisely define what a form value could be
export type FormValue = string | number | boolean | null;

/**
 * Represents the output object of a dynamic form.
 * The keys are the 'name' of the fields, the values are the 'FormValue'.
 */
export type DynamicFormRawValue = Record<string, FormValue>;

export interface FormFieldBehaviors {
  hasPasswordToggle?: boolean;
  autofocus?: boolean;
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  initialValue?: FormValue;
  className?: string;
  validators?: ValidatorFn[];
  behaviors?: FormFieldBehaviors;
}
