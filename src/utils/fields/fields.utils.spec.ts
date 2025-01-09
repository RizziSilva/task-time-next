import { z } from 'zod';
import { validateFormData } from './fields.utils';
import { FormError } from '@/types';

describe('validateFormData utils tests', () => {
  it('Return form error on validation error', () => {
    const fieldName: string = 'name';
    const defaultErrorMessage: string = 'Default error message';
    const validationSchema = z
      .object({
        [fieldName]: z
          .string({ invalid_type_error: defaultErrorMessage })
          .min(1, { message: defaultErrorMessage }),
      })
      .required();

    const error: FormError = { field: fieldName, message: defaultErrorMessage };
    const expected: Array<FormError> = [error];
    const field: Object = { [fieldName]: '' };
    const result: Array<FormError> = validateFormData(validationSchema, field);

    expect(result).toEqual(expected);
  });

  it('Return empty errors array', () => {
    const fieldName: string = 'name';
    const defaultErrorMessage: string = 'Default error message';
    const validationSchema = z
      .object({
        [fieldName]: z
          .string({ invalid_type_error: defaultErrorMessage })
          .min(1, { message: defaultErrorMessage }),
      })
      .required();

    const expected: Array<FormError> = [];
    const field: Object = { [fieldName]: 'Test Name' };
    const result: Array<FormError> = validateFormData(validationSchema, field);

    expect(result).toEqual(expected);
  });
});
