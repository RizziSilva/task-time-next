'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SafeParseReturnType, z } from 'zod';
import { FormStateType, Tokens } from '@types';
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
    email: z
      .string({ required_error: REQUIRED_EMAIL_ERROR_MESSAGE })
      .email({ message: INVALID_EMAIL_ERROR_MESSAGE }),
    password: z.string({ required_error: REQUIRED_PASSWORD_ERROR_MESSAGE }),
  })
  .required();

function validateFormData(email: string, password: string) {
  const result = loginValidation.safeParse({ email, password });
  const hasErrors: boolean = !result.success && !!result.error;
  let errors: Array<any> = [];
  console.log({ email, password });
  if (hasErrors)
    errors = result.error.errors.map((error) => ({
      field: error.path[0],
      errorMessage: error.message,
    }));

  return errors;
}

export async function handleLoginAction(
  state: FormStateType,
  formData: FormData,
): Promise<FormStateType> {
  try {
    const password = formData.get(FIELDS.PASSWORD.name) as string;
    const email = formData.get(FIELDS.EMAIL.name) as string;
    console.log(validateFormData(email, password));
    const authService: AuthService = new AuthService();
    const response = await authService.login({ email, password });
    const tokens: Tokens = {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
    };

    cookies().set(COOKIES_KEYS.ACCESS, tokens.accessToken);
    cookies().set(COOKIES_KEYS.REFRESH, tokens.refreshToken);
  } catch (error) {
    const errorMessage: string = getErrorMessage(error, DEFAULT_LOGIN_ERROR_MESSAGE);

    return { errorMessage };
  }

  redirect(ROUTES.HOME);
}
