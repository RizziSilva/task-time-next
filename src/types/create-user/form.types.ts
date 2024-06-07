import { FormError } from '../form/error.types';

export interface CreateUserFormState {
  email?: FormDataEntryValue | null;
  name?: FormDataEntryValue | null;
  password?: FormDataEntryValue | null;
  errorMessage?: string;
  fieldErrors?: Array<FormError>;
}
