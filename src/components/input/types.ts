import { FormError } from '@types';

export interface InputProps {
  className?: string;
  type?: string;
  label: string;
  name: string;
  id: string;
  error?: FormError;
  onChange?: any;
}
