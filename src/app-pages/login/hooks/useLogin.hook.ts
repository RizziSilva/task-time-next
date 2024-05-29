'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ZodIssue, z } from 'zod';
import { FormStateType, Tokens, FormError } from '@types';
import { AuthService } from '@services';
import { getErrorMessage } from '@utils';
import { COOKIES_KEYS, ROUTES } from '@constants';
import {
  DEFAULT_LOGIN_ERROR_MESSAGE,
  FIELDS,
  INVALID_EMAIL_ERROR_MESSAGE,
  REQUIRED_EMAIL_ERROR_MESSAGE,
  REQUIRED_PASSWORD_ERROR_MESSAGE,
} from '../constants';

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

function validateFormData(email: string, password: string): Array<FormError> {
  const result = loginValidation.safeParse({ password, email });
  const resultErrors: ZodIssue[] = result?.error?.errors || [];

  return resultErrors.map(({ path, message }) => ({
    field: path[0],
    message,
  }));
}

async function handleLogin(password: string, email: string) {
  try {
    const authService: AuthService = new AuthService();
    const response = await authService.login({ email, password });
    const tokens: Tokens = {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
    };

    cookies().set(COOKIES_KEYS.ACCESS, tokens.accessToken);
    cookies().set(COOKIES_KEYS.REFRESH, tokens.refreshToken);
  } catch (error) {
    throw error;
  }
}

export async function handleLoginAction(
  state: FormStateType,
  formData: FormData,
): Promise<FormStateType> {
  try {
    const password = formData.get(FIELDS.PASSWORD.name) as string;
    const email = formData.get(FIELDS.EMAIL.name) as string;
    const errors: Array<FormError> = validateFormData(email, password);

    if (errors.length) return { email, password, fieldErrors: errors };

    await handleLogin(password, email);
  } catch (error) {
    const errorMessage: string = getErrorMessage(error, DEFAULT_LOGIN_ERROR_MESSAGE);

    return { errorMessage };
  }

  redirect(ROUTES.HOME);
}
