import { AuthService } from '@/services';
import { handleLoginAction } from './useLogin.hook';
import { FormStateType } from '@/types';

describe('UseLogin hook tests', () => {
  let authService: AuthService;

  beforeAll(() => {
    authService = new AuthService();
  });

  describe('handleLoginAction tests', () => {
    it('Return default error message on login error', () => {
      const formState: FormStateType = {};
      const formData: FormData = new FormData();

      jest.spyOn(authService, 'login').mockRejectedValue('');

      const act: Function = async () => {
        await handleLoginAction(formState, formData);
      };

      expect(act).rejects.toThrow();
    });
  });
});
