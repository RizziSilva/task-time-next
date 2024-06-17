import { CreateUserFormState } from '@types';
import { ROUTES } from '@constants';
import { UserService } from '@services';
import { FIELDS_KEYS } from '../constants';
import { handleCreateUserAction } from './useCreateUser.hook';
import { redirect } from 'next/navigation';
import { validateFormData } from '@/utils';

jest.mock('@services');

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  redirect: jest.fn(),
}));

jest.mock('@utils', () => ({
  ...jest.requireActual('@utils'),
  validateFormData: jest.fn(),
}));

describe('UseCreateUser hook tests', () => {
  it('Create user and redirect to login page on success', async () => {
    const state: CreateUserFormState = {};
    const formData: FormData = new FormData();
    const email: string = 'test@email.com';
    const name: string = 'Test Name';
    const password: string = 'Password@1234';

    formData.append(FIELDS_KEYS.EMAIL.name, email);
    formData.append(FIELDS_KEYS.NAME.name, name);
    formData.append(FIELDS_KEYS.PASSWORD.name, password);

    const createUserSpy = jest.spyOn(UserService.prototype, 'createUser').mockResolvedValueOnce({});

    const result: CreateUserFormState = await handleCreateUserAction(state, formData);

    expect(createUserSpy).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith(ROUTES.LOGIN);
    expect(validateFormData).toHaveBeenCalled();
  });
});
