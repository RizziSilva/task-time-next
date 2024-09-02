import { FormError } from '../form/error.types';
import { LoginResponseType } from './response.types';

export interface LoginFormState {
  password?: FormDataEntryValue | null;
  email?: FormDataEntryValue | null;
  errorMessage?: string;
  fieldErrors?: Array<FormError>;
  user?: LoginResponseType;
  isValid: boolean;
}
