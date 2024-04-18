'use server';

import { FormStateType } from './types';

export async function handleLoginAction(
  state: FormStateType,
  payload: FormData,
): Promise<FormStateType> {
  const password = payload.get('password');
  const email = payload.get('email');

  return {
    password: password,
    email: email,
  };
}
