import { FormError } from '../form/error.types';

export interface LoginFormState {
  password?: FormDataEntryValue | null;
  email?: FormDataEntryValue | null;
  errorMessage?: string;
  fieldErrors?: Array<FormError>;
}
