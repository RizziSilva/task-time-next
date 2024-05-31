import { act, fireEvent, render, screen } from '@testing-library/react';
import { FormError, FormStateType } from '@types';
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

    const logoImage = await screen.findByAltText('logo', { exact: false });
    const emailInput = await screen.findByRole('textbox', {
      name: FIELDS.EMAIL.label,
    });
    const passwordInput = await screen.findByLabelText(FIELDS.PASSWORD.label);
    const loginButton = await screen.findByRole('button');
    const createAccountText = await screen.findByText('crie sua conta!', { exact: false });

    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(createAccountText).toBeInTheDocument();
    expect(logoImage).toBeInTheDocument();
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

  it('Show input error message for invalid value', async () => {
    const emailError: FormError = { field: 'email', message: 'Invalid value' };
    const formState: FormStateType = { fieldErrors: [emailError] };

    jest.spyOn(useLoginHook, 'handleLoginAction').mockResolvedValueOnce(formState);

    render(<LoginForm />);

    const submitButton = screen.getByRole('button', { name: 'Login' });
    act(() => {
      fireEvent.click(submitButton);
    });

    const inputErrorMessage = await screen.findByText(emailError.message);

    expect(inputErrorMessage).toBeInTheDocument();
    expect(useLoginHook.handleLoginAction).toHaveBeenCalled();
  });
});
