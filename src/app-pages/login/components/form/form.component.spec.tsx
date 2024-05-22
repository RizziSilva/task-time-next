import { act, fireEvent, render, screen } from '@testing-library/react';
import { FormStateType } from '@types';
import { LoginForm } from './form.component';
import * as useLoginHook from '../../hooks/useLogin.hook';
import { DEFAULT_LOGIN_ERROR_MESSAGE, FIELDS } from '../../constants';

jest.mock('../../hooks/useLogin.hook', () => {
  return {
    ...jest.requireActual('../../hooks/useLogin.hook'),
    handleLoginAction: jest.fn(),
  };
});

describe('Login form component tests', () => {
  it('Render form correctly', async () => {
    render(<LoginForm />);

    const emailInput = await screen.findByRole('textbox', {
      name: FIELDS.EMAIL.label,
    });
    const passwordInput = await screen.findByLabelText(FIELDS.PASSWORD.label);

    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  it('Show error message for invalid login', async () => {
    const formState: FormStateType = { errorMessage: DEFAULT_LOGIN_ERROR_MESSAGE };

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
