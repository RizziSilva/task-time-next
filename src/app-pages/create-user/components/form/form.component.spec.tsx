import { act, fireEvent, render, screen } from '@testing-library/react';
import { CreateUserFormState, FormError } from '@types';
import * as useCreateUserHook from '../../hooks/useCreateUser.hook';
import { CreateUserForm } from './form.component';
import { CREATE_USER_DEFAULT_ERROR_MESSAGE, FIELDS_KEYS } from '../../constants';

jest.mock('../../hooks/useCreateUser.hook', () => {
  return {
    ...jest.requireActual('../../hooks/useCreateUser.hook'),
    handleCreateUserAction: jest.fn(),
  };
});

describe('Create user form tests', () => {
  it('Render form correctly', async () => {
    render(<CreateUserForm />);

    const logoImage = await screen.findByAltText('logo', { exact: false });
    const emailInput = await screen.findByRole('textbox', {
      name: FIELDS_KEYS.EMAIL.label,
    });
    const passwordInput = await screen.findByLabelText(FIELDS_KEYS.PASSWORD.label);
    const nameInput = await screen.findByRole('textbox', {
      name: FIELDS_KEYS.NAME.label,
    });
    const createAccountButton = await screen.findByRole('button');
    const LoginText = await screen.findByText('Login!', { exact: false });

    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(createAccountButton).toBeInTheDocument();
    expect(LoginText).toBeInTheDocument();
    expect(logoImage).toBeInTheDocument();
  });

  it('Show error message for invalid create user action', async () => {
    const formState: CreateUserFormState = { errorMessage: CREATE_USER_DEFAULT_ERROR_MESSAGE };

    jest.spyOn(useCreateUserHook, 'handleCreateUserAction').mockResolvedValueOnce(formState);

    render(<CreateUserForm />);

    const submitButton = screen.getByRole('button', { name: 'Criar conta' });
    act(() => {
      fireEvent.click(submitButton);
    });

    const errorMessage = await screen.findByText(CREATE_USER_DEFAULT_ERROR_MESSAGE);

    expect(errorMessage).toBeInTheDocument();
    expect(useCreateUserHook.handleCreateUserAction).toHaveBeenCalled();
  });

  it('Show input error message for invalid value', async () => {
    const emailError: FormError = { field: FIELDS_KEYS.EMAIL.name, message: 'Invalid value' };
    const formState: CreateUserFormState = { fieldErrors: [emailError] };

    jest.spyOn(useCreateUserHook, 'handleCreateUserAction').mockResolvedValueOnce(formState);

    render(<CreateUserForm />);

    const submitButton = screen.getByRole('button', { name: 'Criar conta' });
    act(() => {
      fireEvent.click(submitButton);
    });

    const inputErrorMessage = await screen.findByText(emailError.message);

    expect(inputErrorMessage).toBeInTheDocument();
    expect(useCreateUserHook.handleCreateUserAction).toHaveBeenCalled();
  });
});
