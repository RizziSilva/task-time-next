import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AuthService } from '@services';
import {
  ROUTES,
  INVALID_EMAIL_ERROR_MESSAGE,
  REQUIRED_EMAIL_ERROR_MESSAGE,
  REQUIRED_PASSWORD_ERROR_MESSAGE,
} from '@constants';
import { FormError, LoginFormState } from '@types';
import { handleLoginAction } from './useLogin.hook';
import { DEFAULT_LOGIN_ERROR_MESSAGE, FIELDS } from '../constants';

jest.mock('@services');

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  redirect: jest.fn(),
}));

jest.mock('next/headers', () => ({
  ...jest.requireActual('next/headers'),
  cookies: jest.fn(() => ({
    set: jest.fn(),
  })),
}));

describe('UseLogin hook tests', () => {
  describe('handleLoginAction tests', () => {
    it('Save cookies and redirect to home on request success', async () => {
      const formState: LoginFormState = {};
      const loginResponse: any = { access_token: 'access_token', refresh_token: 'refresh_token' };
      const formData: FormData = new FormData();

      formData.append('email', 'test@email.com');
      formData.append('password', 'testePassword');

      const loginRequestSpy = jest
        .spyOn(AuthService.prototype, 'login')
        .mockResolvedValueOnce(loginResponse);

      const result: LoginFormState = await handleLoginAction(formState, formData);

      // TODO silva.william 22/05/2024: Assert that cookies().set instead of cookies gets called 2 times.
      expect(result).toBeUndefined();
      expect(redirect).toHaveBeenCalledWith(ROUTES.HOME);
      expect(cookies).toHaveBeenCalledTimes(2);
      expect(loginRequestSpy).toHaveBeenCalled();
    });

    it('Return default error message on login error', async () => {
      const formState: LoginFormState = {};
      const expected: LoginFormState = { errorMessage: DEFAULT_LOGIN_ERROR_MESSAGE };
      const formData: FormData = new FormData();

      formData.append('email', 'test@email.com');
      formData.append('password', 'testePassword');

      const loginRequestSpy = jest.spyOn(AuthService.prototype, 'login').mockImplementation(() => {
        throw new Error();
      });

      const result: LoginFormState = await handleLoginAction(formState, formData);

      expect(result).toEqual(expected);
      expect(loginRequestSpy).toHaveBeenCalled();
      expect(loginRequestSpy).toThrow();
    });

    it('Return required email error for missing email', async () => {
      const password: string = 'testePassword';
      const formState: LoginFormState = {};

      const formData: FormData = new FormData();

      formData.append('password', password);
      formState.password = password;
      formState.email = null;

      const formError: FormError = {
        field: FIELDS.EMAIL.name,
        message: REQUIRED_EMAIL_ERROR_MESSAGE,
      };
      const expected: LoginFormState = { ...formState, fieldErrors: [formError] };
      const loginRequestSpy = jest.spyOn(AuthService.prototype, 'login');

      const result: LoginFormState = await handleLoginAction(formState, formData);

      expect(result).toEqual(expected);
      expect(loginRequestSpy).not.toHaveBeenCalled();
    });

    it('Return invalid email error for invalid email', async () => {
      const email: string = 'invalid@email';
      const password: string = 'testPassword';
      const formState: LoginFormState = {};

      const formData: FormData = new FormData();

      formData.append('email', email);
      formData.append('password', password);
      formState.email = email;
      formState.password = password;

      const formError: FormError = {
        field: FIELDS.EMAIL.name,
        message: INVALID_EMAIL_ERROR_MESSAGE,
      };
      const expected: LoginFormState = { ...formState, fieldErrors: [formError] };
      const loginRequestSpy = jest.spyOn(AuthService.prototype, 'login');

      const result: LoginFormState = await handleLoginAction(formState, formData);

      expect(result).toEqual(expected);
      expect(loginRequestSpy).not.toHaveBeenCalled();
    });

    it('Return required password error for missing password', async () => {
      const email: string = 'test@email.com';
      const formState: LoginFormState = {};

      const formData: FormData = new FormData();

      formData.append('email', email);
      formState.email = email;
      formState.password = null;

      const formError: FormError = {
        field: FIELDS.PASSWORD.name,
        message: REQUIRED_PASSWORD_ERROR_MESSAGE,
      };
      const expected: LoginFormState = { ...formState, fieldErrors: [formError] };
      const loginRequestSpy = jest.spyOn(AuthService.prototype, 'login');

      const result: LoginFormState = await handleLoginAction(formState, formData);

      expect(result).toEqual(expected);
      expect(loginRequestSpy).not.toHaveBeenCalled();
    });
  });
});
