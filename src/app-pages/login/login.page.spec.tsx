import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { LoginPage } from './login.page';

describe('Login page tests', () => {
  it('Renders form component', () => {
    render(<LoginPage />);

    const form = screen.getByRole('form');

    expect(form).toBeInTheDocument();
  });
});
