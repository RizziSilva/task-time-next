'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { FormStateType, Tokens } from '@types';
import { AuthService } from '@services';
import { getErrorMessage } from '@utils';
import { COOKIES_KEYS, ROUTES } from '@constants';
import { FIELDS } from './constants';

export async function handleLoginAction(
  state: FormStateType,
  formData: FormData,
): Promise<FormStateType> {
  try {
    const password = formData.get(FIELDS.PASSWORD.name) as string;
    const email = formData.get(FIELDS.EMAIL.name) as string;
    const authService: AuthService = new AuthService();
    const response = await authService.login({ email, password });
    const tokens: Tokens = {
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
    };
    cookies().set(COOKIES_KEYS.ACCESS, tokens.accessToken);
    cookies().set(COOKIES_KEYS.REFRESH, tokens.refreshToken);
  } catch (error) {
    const errorMessage: string = getErrorMessage(error, 'Mensagem de erro padrão');

    return { errorMessage };
  }

  redirect(ROUTES.HOME);
}
