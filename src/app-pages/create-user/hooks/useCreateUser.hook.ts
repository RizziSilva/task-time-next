import { redirect } from 'next/navigation';
import { ZodIssue, z } from 'zod';
import { UserService } from '@services';
import { CreateUserFormState, CreateUserRequest } from '@types';
import { getErrorMessage } from '@utils';
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

export function handleFieldValidations(email: string, name: string, password: string) {
  const result = createUserValidation.safeParse({ password, email, name });
  const resultErrors: ZodIssue[] = result?.error?.errors || [];

  return resultErrors.map(({ path, message }) => ({
    field: path[0],
    message,
  }));
}

async function handleCreateUser(requestBody: CreateUserRequest): Promise<void> {
  try {
    const userService: UserService = new UserService();

    await userService.createUser(requestBody);
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

    await handleCreateUser(requestBody);
  } catch (error) {
    const errorMessage: string = getErrorMessage(error, CREATE_USER_DEFAULT_ERROR_MESSAGE);

    return { errorMessage };
  }

  redirect(ROUTES.HOME);
}
