'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { LoginFormState, Tokens, FormError } from '@types';
import { AuthService } from '@services';
import { getAccessAndRefreshExpire, getErrorMessage, validateFormData } from '@utils';
import {
  COOKIES_KEYS,
  ROUTES,
  INVALID_EMAIL_ERROR_MESSAGE,
  REQUIRED_EMAIL_ERROR_MESSAGE,
  REQUIRED_PASSWORD_ERROR_MESSAGE,
  TOKEN_TYPE,
  COOKIE_OPTIONS,
} from '@constants';
import { DEFAULT_LOGIN_ERROR_MESSAGE, FIELDS } from '../constants';

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
    const authService: AuthService = new AuthService();
    const response = await authService.login({ email, password });
    const tokens: Tokens = {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
    };
    const cookiesExpiration = getAccessAndRefreshExpire();

    cookies().set(COOKIES_KEYS.ACCESS, `${TOKEN_TYPE}${tokens.accessToken}`, {
      expires: cookiesExpiration.accessExpirationDate,
      ...COOKIE_OPTIONS,
    });
    cookies().set(COOKIES_KEYS.REFRESH, `${TOKEN_TYPE}${tokens.refreshToken}`, {
      expires: cookiesExpiration.refreshExpirationDate,
      ...COOKIE_OPTIONS,
    });
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
