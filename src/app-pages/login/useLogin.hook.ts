'use server';

import { FormStateType } from '@types';
import { AuthService } from '@services';
import { getErrorMessage } from '@utils';
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
    console.log(response);
    // Salvar os tokens da response nos cookies? Pesquisar qual a melhor maneira de salvar tokens com o next.

    return { email, password };
  } catch (error) {
    const errorMessage: string = getErrorMessage(error, 'Mensagem de erro padrão');

    return { errorMessage };
  }
}
