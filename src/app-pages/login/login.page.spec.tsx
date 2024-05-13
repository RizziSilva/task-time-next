import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { LoginPage } from './login.page';
import { useFormState } from 'react-dom';

describe('Login page tests', () => {
  beforeEach(() => {
    jest.mock('react-dom', () => ({
      ...jest.requireActual('react-dom'),
      useFormState: jest.fn(),
    }));
  });

  it('Renders form component', () => {
    render(<LoginPage />);

    const form = screen.getByRole('form');

    expect(form).toBeInTheDocument();
  });
});
