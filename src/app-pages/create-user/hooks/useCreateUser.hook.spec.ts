import { redirect } from 'next/navigation';
import { CreateUserFormState, FormError } from '@types';
import { REQUIRED_EMAIL_ERROR_MESSAGE, ROUTES } from '@constants';
import * as services from '@services';
import * as utils from '@utils';
import * as cookies from '@app-utils';
import { CREATE_USER_DEFAULT_ERROR_MESSAGE, FIELDS_KEYS } from '../constants';
import { handleCreateUserAction } from './useCreateUser.hook';

jest.mock('@services');

jest.mock('@utils');

jest.mock('@app-utils');

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  redirect: jest.fn(),
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

    jest.spyOn(cookies, 'getRequestHeaders').mockReturnValueOnce({ Cookie: '' });
    jest.spyOn(utils, 'validateFormData').mockReturnValueOnce([]);
    jest.spyOn(services, 'createUser').mockResolvedValueOnce({});
    await handleCreateUserAction(state, formData);

    expect(services.createUser).toHaveBeenCalled();
    expect(utils.validateFormData).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith(ROUTES.LOGIN);
  });

  it('Return default error message on create user error', async () => {
    const state: CreateUserFormState = {};
    const formData: FormData = new FormData();
    const email: string = 'test@email.com';
    const name: string = 'Test Name';
    const password: string = 'Password@1234';
    const expected: CreateUserFormState = {
      errorMessage: CREATE_USER_DEFAULT_ERROR_MESSAGE,
    };

    formData.append(FIELDS_KEYS.EMAIL.name, email);
    formData.append(FIELDS_KEYS.NAME.name, name);
    formData.append(FIELDS_KEYS.PASSWORD.name, password);

    jest.spyOn(services, 'createUser').mockImplementation(() => {
      throw new Error();
    });
    jest.spyOn(cookies, 'getRequestHeaders').mockReturnValueOnce({ Cookie: '' });
    jest.spyOn(utils, 'validateFormData').mockReturnValueOnce([]);
    jest.spyOn(utils, 'getErrorMessage').mockReturnValueOnce(CREATE_USER_DEFAULT_ERROR_MESSAGE);

    const result: CreateUserFormState = await handleCreateUserAction(state, formData);

    expect(result).toEqual(expected);
    expect(services.createUser).toHaveBeenCalled();
    expect(utils.validateFormData).toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it('Return default error message on create user error', async () => {
    const state: CreateUserFormState = {};
    const formData: FormData = new FormData();
    const email: string = 'test@email.com';
    const name: string = 'Test Name';
    const password: string = 'Password@1234';
    const expected: CreateUserFormState = {
      errorMessage: CREATE_USER_DEFAULT_ERROR_MESSAGE,
    };

    formData.append(FIELDS_KEYS.EMAIL.name, email);
    formData.append(FIELDS_KEYS.NAME.name, name);
    formData.append(FIELDS_KEYS.PASSWORD.name, password);

    jest.spyOn(services, 'createUser').mockImplementation(() => {
      throw new Error();
    });
    jest.spyOn(cookies, 'getRequestHeaders').mockReturnValueOnce({ Cookie: '' });
    jest.spyOn(utils, 'validateFormData').mockReturnValueOnce([]);
    jest.spyOn(utils, 'getErrorMessage').mockReturnValueOnce(CREATE_USER_DEFAULT_ERROR_MESSAGE);

    const result: CreateUserFormState = await handleCreateUserAction(state, formData);

    expect(result).toEqual(expected);
    expect(services.createUser).toHaveBeenCalled();
    expect(utils.validateFormData).toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it('Return field error when validation fails', async () => {
    const state: CreateUserFormState = {};
    const formData: FormData = new FormData();
    const email: string = '';
    const name: string = 'Test Name';
    const password: string = 'Password@1234';
    const emailError: FormError = {
      field: FIELDS_KEYS.EMAIL.name,
      message: REQUIRED_EMAIL_ERROR_MESSAGE,
    };
    const expected: CreateUserFormState = {
      email,
      name,
      password,
      fieldErrors: [emailError],
    };

    formData.append(FIELDS_KEYS.EMAIL.name, email);
    formData.append(FIELDS_KEYS.NAME.name, name);
    formData.append(FIELDS_KEYS.PASSWORD.name, password);

    jest.spyOn(services, 'createUser');
    jest.spyOn(cookies, 'getRequestHeaders').mockReturnValueOnce({ Cookie: '' });
    jest.spyOn(utils, 'validateFormData').mockReturnValueOnce([emailError]);
    const result: CreateUserFormState = await handleCreateUserAction(state, formData);

    expect(result).toEqual(expected);
    expect(utils.validateFormData).toHaveBeenCalled();
    expect(services.createUser).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });
});
