'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  API_DOMAIN,
  COOKIE_TYPE,
  COOKIES_KEYS,
  INVALID_EMAIL_ERROR_MESSAGE,
  REQUIRED_EMAIL_ERROR_MESSAGE,
  REQUIRED_PASSWORD_ERROR_MESSAGE,
  ROUTES,
} from '@constants';
import { AuthService } from '@services';
import { FormError, LoginFormState, LoginResponseType, Tokens } from '@types';
import { getErrorMessage, validateFormData } from '@utils';
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

function setTokensCookie(tokens: Tokens): void {
  const cookiesHandler = cookies();
  const options = {
    domain: API_DOMAIN,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  };

  cookiesHandler.set(COOKIES_KEYS.ACCESS, `${COOKIE_TYPE}${tokens.access_token}`, options);
  cookiesHandler.set(COOKIES_KEYS.REFRESH, `${COOKIE_TYPE}${tokens.refresh_token}`, options);
}

async function handleLogin(password: string, email: string): Promise<LoginResponseType> {
  try {
    const authService: AuthService = new AuthService();
    const response: LoginResponseType = await authService.login({ email, password });
    setTokensCookie(response.token);

    return response;
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
    const hasFieldErrors: boolean = !!errors.length;

    if (hasFieldErrors) return { email, password, fieldErrors: errors };

    await handleLogin(password, email);
    redirect(ROUTES.TIMER);
  } catch (error) {
    console.error(error);
    const errorMessage: string = getErrorMessage(error, DEFAULT_LOGIN_ERROR_MESSAGE);

    return { errorMessage };
  }
}
