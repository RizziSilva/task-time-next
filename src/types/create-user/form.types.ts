import { FormError } from '../form/error.types';

export interface CreateUserFormState {
  email?: string;
  name?: string;
  password?: string;
  errorMessage?: string;
  fieldErrors?: FormError;
}
