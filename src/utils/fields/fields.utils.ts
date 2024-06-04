import { SafeParseError, SafeParseSuccess } from 'zod';

export function getErrorsFromZodParse(test: SafeParseSuccess<Output> | SafeParseError<Input>) {
  const result = createUserValidation.safeParse({ password, email, name });
  const resultErrors: ZodIssue[] = result?.error?.errors || [];

  return resultErrors.map(({ path, message }) => ({
    field: path[0],
    message,
  }));
}
