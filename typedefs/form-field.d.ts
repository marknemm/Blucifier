import { Control, FieldError, FieldErrors, FieldErrorsImpl, Merge, RegisterOptions } from 'react-hook-form';

/**
 * Properties for form field components.
 *
 * @param F The type of the form data.
 */
export interface FormFieldProps<F = any> {

  /**
   * The control for the form.
   */
  control?: Control<F>;

  /**
   * The error message to display for the form field.
   */
  errorMessage?: string;

  /**
   * The errors associated with the form control.
   */
  errors?: FieldErrors<F>;

  /**
   * The name of the form field.
   */
  name?: string;

  /**
   * The input validation rules for the form field.
   */
  rules?: FormFieldRules;

  /**
   * The rules to error message map for the form field. Maps rules (error types) to error messages.
   */
  rulesErrorMessageMap?: Record<string, string>;
}

export type FormFieldError = FieldError | Merge<FieldError, FieldErrorsImpl<any>>
export type FormFieldRules = Omit<RegisterOptions<any, string>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs">;