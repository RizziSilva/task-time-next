import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AuthService } from '@services';
import { ROUTES, REQUIRED_EMAIL_ERROR_MESSAGE } from '@constants';
import { FormError, LoginFormState } from '@types';
import * as utils from '@utils';
import { handleLoginAction } from './useLogin.hook';
import { DEFAULT_LOGIN_ERROR_MESSAGE, FIELDS } from '../constants';

jest.mock('@services');

jest.mock('@utils');

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
      jest.spyOn(utils, 'validateFormData').mockReturnValueOnce([]);

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
      jest.spyOn(utils, 'validateFormData').mockReturnValueOnce([]);
      jest.spyOn(utils, 'getErrorMessage').mockReturnValueOnce(DEFAULT_LOGIN_ERROR_MESSAGE);

      const result: LoginFormState = await handleLoginAction(formState, formData);

      expect(result).toEqual(expected);
      expect(utils.validateFormData).toHaveBeenCalled();
      expect(loginRequestSpy).toHaveBeenCalled();
      expect(loginRequestSpy).toThrow();
    });

    it('Return field error when validation fails', async () => {
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

      jest.spyOn(utils, 'validateFormData').mockReturnValueOnce([formError]);

      const result: LoginFormState = await handleLoginAction(formState, formData);

      expect(result).toEqual(expected);
      expect(loginRequestSpy).not.toHaveBeenCalled();
      expect(redirect).not.toHaveBeenCalled();
    });
  });
});
