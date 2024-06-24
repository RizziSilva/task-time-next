import { FormError } from '@/types';
import { ZodIssue, ZodObject } from 'zod';

export function validateFormData(
  validationSchema: ZodObject<any>,
  values: Object,
): Array<FormError> {
  const result = validationSchema.safeParse({ ...values });
  const resultErrors: ZodIssue[] = result?.error?.errors || [];

  return resultErrors.map(({ path, message }) => ({
    field: path[0],
    message,
  }));
}
