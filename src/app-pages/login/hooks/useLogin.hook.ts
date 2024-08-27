'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { LoginFormState, Tokens, FormError } from '@types';
import { getErrorMessage, validateFormData } from '@utils';
import {
  ROUTES,
  INVALID_EMAIL_ERROR_MESSAGE,
  REQUIRED_EMAIL_ERROR_MESSAGE,
  REQUIRED_PASSWORD_ERROR_MESSAGE,
} from '@constants';
import { DEFAULT_LOGIN_ERROR_MESSAGE, FIELDS } from '../constants';
import { signIn } from 'next-auth/react';

const loginValidation = z
  .object({
    password: z
      .string({ invalid_type_error: REQUIRED_PASSWORD_ERROR_MESSAGE })
      .min(1, { message: REQUIRED_PASSWORD_ERROR_MESSAGE }),
    email: z
      .string({ invalid_type_error: REQUIRED_EMAIL_ERROR_MESSAGE })
      .min(1, { message: REQUIRED_EMAIL_ERROR_MESSAGE })
      .email({ message: INVALID_EMAIL_ERROR_MESSAGE }),
  })
  .required();

export async function handleLoginAction(
  state: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  try {
    const password = formData.get(FIELDS.PASSWORD.name) as string;
    const email = formData.get(FIELDS.EMAIL.name) as string;
    const errors: Array<FormError> = validateFormData(loginValidation, { email, password });

    if (errors.length) return { email, password, fieldErrors: errors };

    await signIn('credentials', { password, email });
  } catch (error) {
    const errorMessage: string = getErrorMessage(error, DEFAULT_LOGIN_ERROR_MESSAGE);

    return { errorMessage };
  }

  redirect(ROUTES.HOME);
}
