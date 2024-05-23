'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { FormStateType, Tokens } from '@types';
import { AuthService } from '@services';
import { getErrorMessage } from '@utils';
import { COOKIES_KEYS, ROUTES } from '@constants';
import { DEFAULT_LOGIN_ERROR_MESSAGE, FIELDS } from '../constants';

const loginValidation = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string({ required_error: 'Informe uma senha' }),
});

function validateFormData(email, password) {
  const result = loginValidation.safeParse({ password });
  console.log(result.error);
}

export async function handleLoginAction(
  state: FormStateType,
  formData: FormData,
): Promise<FormStateType> {
  try {
    const password = formData.get(FIELDS.PASSWORD.name) as string;
    const email = formData.get(FIELDS.EMAIL.name) as string;
    validateFormData(email, password);
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
