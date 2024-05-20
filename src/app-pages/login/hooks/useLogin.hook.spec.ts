import { AuthService } from '@services';
import { FormStateType } from '@types';
import { handleLoginAction } from './useLogin.hook';
import { DEFAULT_LOGIN_ERROR_MESSAGE } from '../constants';

jest.mock('@services');

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
  });
});
