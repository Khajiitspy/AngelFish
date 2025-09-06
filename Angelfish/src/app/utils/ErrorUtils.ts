import { FormGroup } from '@angular/forms';

interface ServerValidationError {
  status: number;
  isValid: boolean;
  errors: Record<string, string[]>;
}

interface ServerError {
  error: ServerValidationError;
}

export interface OnFieldError {
  serverError: string;
}

export class ErrorUtils {
  static handleValidation(serverError: ServerError, form: FormGroup): string {
    console.log(serverError);

    if (serverError.error.status === 400 && serverError.error.errors) {
      Object.entries(serverError.error.errors).forEach(([field, messages]) => {
        const control = form.get(field);
        if (control) {
          control.setErrors({ serverError: messages.join(', ') } as OnFieldError );
          control.markAsTouched();
        }

        console.log(control?.errors);
      });
      return 'Invalid form';
    }

    return 'Server error, try again later';
  }
}
