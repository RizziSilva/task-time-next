'use server';

import { cookies } from 'next/headers';
import { z } from 'zod';
import { LoginFormState, Tokens, FormError } from '@types';
import { AuthService } from '@services';
import { getErrorMessage, validateFormData } from '@utils';
import {
  COOKIES_KEYS,
  ROUTES,
  INVALID_EMAIL_ERROR_MESSAGE,
  REQUIRED_EMAIL_ERROR_MESSAGE,
  REQUIRED_PASSWORD_ERROR_MESSAGE,
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

async function handleLogin(password: string, email: string): Promise<Tokens> {
  try {
    const authService: AuthService = new AuthService();
    const response = await authService.login({ email, password });
    const tokens: Tokens = {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
    };

    return tokens;
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

    if (hasFieldErrors) return { email, password, fieldErrors: errors, isValid: !hasFieldErrors };

    const user: Tokens = await handleLogin(password, email);

    return { user, isValid: true };
  } catch (error) {
    console.error(error);
    const errorMessage: string = getErrorMessage(error, DEFAULT_LOGIN_ERROR_MESSAGE);

    return { errorMessage, isValid: false };
  }
}
