import { act, fireEvent, render, screen } from '@testing-library/react';
import { FormStateType } from '@types';
import { LoginForm } from './form.component';
import * as useLoginHook from '../../hooks/useLogin.hook';
import { DEFAULT_LOGIN_ERROR_MESSAGE } from '../../constants';

jest.mock('../../useLogin.hook', () => {
  return {
    ...jest.requireActual('../../useLogin.hook'),
    handleLoginAction: jest.fn(),
  };
});

describe('Login form component tests', () => {
  it('Show error message for invalid login', async () => {
    const formState: FormStateType = { errorMessage: 'Mensagem de erro padrão' };

    jest.spyOn(useLoginHook, 'handleLoginAction').mockResolvedValueOnce(formState);

    render(<LoginForm />);

    const submitButton = screen.getByRole('button', { name: 'Login' });
    act(() => {
      fireEvent.click(submitButton);
    });

    const errorMessage = await screen.findByText(DEFAULT_LOGIN_ERROR_MESSAGE);

    expect(errorMessage).toBeInTheDocument();
    expect(useLoginHook.handleLoginAction).toHaveBeenCalled();
  });
});
