'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { LoginFormState, Tokens, FormError } from '@types';
import { login } from '@services';
import { getErrorMessage, validateFormData } from '@utils';
import {
  COOKIES_KEYS,
  ROUTES,
  INVALID_EMAIL_ERROR_MESSAGE,
  REQUIRED_EMAIL_ERROR_MESSAGE,
  REQUIRED_PASSWORD_ERROR_MESSAGE,
} from '@constants';
import { DEFAULT_LOGIN_ERROR_MESSAGE, FIELDS } from '../constants';
import { handleTokens } from '@/app/utils/cookies/cookies.util';

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

async function handleLogin(password: string, email: string): Promise<void> {
  try {
    const response = await login({ email, password });

    handleTokens(response.token.access_token, response.token.refresh_token);
  } catch (error) {
    throw error;
  }
}

export async function handleLoginAction(
  state: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  try {
    const password = formData.get(FIELDS.PASSWORD.name) as string;
    const email = formData.get(FIELDS.EMAIL.name) as string;
    const errors: Array<FormError> = validateFormData(loginValidation, { email, password });

    if (errors.length) return { email, password, fieldErrors: errors };

    await handleLogin(password, email);
  } catch (error) {
    const errorMessage: string = getErrorMessage(error, DEFAULT_LOGIN_ERROR_MESSAGE);

    return { errorMessage };
  }

  redirect(ROUTES.HOME);
}
