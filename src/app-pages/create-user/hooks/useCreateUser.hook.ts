import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createUser } from '@services';
import { CreateUserFormState, CreateUserRequest, FormError } from '@types';
import { getErrorMessage, validateFormData } from '@utils';
import {
  INVALID_EMAIL_ERROR_MESSAGE,
  REQUIRED_EMAIL_ERROR_MESSAGE,
  REQUIRED_PASSWORD_ERROR_MESSAGE,
  ROUTES,
} from '@constants';
import {
  CREATE_USER_DEFAULT_ERROR_MESSAGE,
  FIELDS_KEYS,
  REQUIRED_NAME_ERROR_MESSAGE,
} from '../constants';

const createUserValidation = z
  .object({
    password: z
      .string({ invalid_type_error: REQUIRED_PASSWORD_ERROR_MESSAGE })
      .min(1, { message: REQUIRED_PASSWORD_ERROR_MESSAGE }),
    email: z
      .string({ invalid_type_error: REQUIRED_EMAIL_ERROR_MESSAGE })
      .min(1, { message: REQUIRED_EMAIL_ERROR_MESSAGE })
      .email({ message: INVALID_EMAIL_ERROR_MESSAGE }),
    name: z
      .string({ invalid_type_error: REQUIRED_NAME_ERROR_MESSAGE })
      .min(1, { message: REQUIRED_NAME_ERROR_MESSAGE }),
  })
  .required();

async function handleCreateUser(requestBody: CreateUserRequest): Promise<void> {
  try {
    await createUser(requestBody);
  } catch (error) {
    throw error;
  }
}

export async function handleCreateUserAction(
  state: CreateUserFormState,
  formData: FormData,
): Promise<CreateUserFormState> {
  try {
    const password = formData.get(FIELDS_KEYS.PASSWORD.name) as string;
    const email = formData.get(FIELDS_KEYS.EMAIL.name) as string;
    const name = formData.get(FIELDS_KEYS.NAME.name) as string;
    const requestBody: CreateUserRequest = { email, name, password };
    const errors: Array<FormError> = validateFormData(createUserValidation, requestBody);

    if (errors.length) return { email, name, password, fieldErrors: errors };

    await handleCreateUser(requestBody);
  } catch (error) {
    const errorMessage: string = getErrorMessage(error, CREATE_USER_DEFAULT_ERROR_MESSAGE);

    return { errorMessage };
  }

  redirect(ROUTES.LOGIN);
}
