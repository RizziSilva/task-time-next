import { cookies } from 'next/headers';
import { AuthService } from '@services';
import { FormStateType } from '@types';
import { redirect } from 'next/navigation';
import { handleLoginAction } from './useLogin.hook';
import { DEFAULT_LOGIN_ERROR_MESSAGE } from '../constants';

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
    it('Return default error message on login error', async () => {
      const formState: FormStateType = {};
      const formData: FormData = new FormData();
      const expected: FormStateType = { errorMessage: DEFAULT_LOGIN_ERROR_MESSAGE };

      jest.spyOn(AuthService.prototype, 'login').mockImplementation(() => {
        throw new Error();
      });

      const result: FormStateType = await handleLoginAction(formState, formData);

      expect(result).toEqual(expected);
    });

    it('Returns form state on success request', async () => {
      const formState: FormStateType = {};
      const formData: FormData = new FormData();
      const loginResponse: any = { access_token: 'access_token', refresh_token: 'refresh_token' };

      jest.spyOn(AuthService.prototype, 'login').mockResolvedValueOnce(loginResponse);

      const result: FormStateType = await handleLoginAction(formState, formData);

      expect(result).toBeUndefined();
      expect(redirect).toHaveBeenCalled();
      expect(cookies().set).toHaveBeenCalledTimes(2);
    });
  });
});
