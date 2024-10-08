import { redirect } from 'next/navigation';
import * as services from '@services';
import * as utils from '@utils';
import * as appUtils from '@app-utils';
import { ROUTES, REQUIRED_EMAIL_ERROR_MESSAGE } from '@constants';
import { FormError, LoginFormState, Tokens } from '@types';
import { handleLoginAction } from './useLogin.hook';
import { DEFAULT_LOGIN_ERROR_MESSAGE, FIELDS } from '../constants';

jest.mock('@services');

jest.mock('@utils');

jest.mock('@app-utils');

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  redirect: jest.fn(),
}));

describe('UseLogin hook tests', () => {
  describe('handleLoginAction tests', () => {
    it('Save cookies and redirect to home on request success', async () => {
      const formState: LoginFormState = {};
      const loginResponse: Tokens = {
        accessToken: 'access_token',
        refreshToken: 'refresh_token',
      };
      const formData: FormData = new FormData();

      formData.append('email', 'test@email.com');
      formData.append('password', 'testePassword');

      const loginRequestSpy = jest.spyOn(services, 'login').mockResolvedValueOnce(loginResponse);
      jest.spyOn(utils, 'validateFormData').mockReturnValueOnce([]);
      jest.spyOn(appUtils, 'setAccessAndRefreshToken');

      const result: LoginFormState = await handleLoginAction(formState, formData);

      expect(result).toBeUndefined();
      expect(redirect).toHaveBeenCalledWith(ROUTES.HOME);
      expect(appUtils.setAccessAndRefreshToken).toHaveBeenCalled();
      expect(loginRequestSpy).toHaveBeenCalled();
    });

    it('Return default error message on login error', async () => {
      const formState: LoginFormState = {};
      const expected: LoginFormState = { errorMessage: DEFAULT_LOGIN_ERROR_MESSAGE };
      const formData: FormData = new FormData();

      formData.append('email', 'test@email.com');
      formData.append('password', 'testePassword');

      const loginRequestSpy = jest.spyOn(services, 'login').mockImplementation(() => {
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
      const loginRequestSpy = jest.spyOn(services, 'login');

      jest.spyOn(utils, 'validateFormData').mockReturnValueOnce([formError]);

      const result: LoginFormState = await handleLoginAction(formState, formData);

      expect(result).toEqual(expected);
      expect(loginRequestSpy).not.toHaveBeenCalled();
      expect(redirect).not.toHaveBeenCalled();
    });
  });
});
