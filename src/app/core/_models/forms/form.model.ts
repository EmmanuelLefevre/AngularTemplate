export type FormFieldType = 'email' | 'password' | 'text' | 'tel' | 'number';

// We precisely define what a form value could be
export type FormValue = string | number | boolean | null;

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
  behaviors?: FormFieldBehaviors;
}
