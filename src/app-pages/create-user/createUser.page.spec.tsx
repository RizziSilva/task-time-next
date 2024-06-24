import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CreateUserPage } from './createUser.page';

describe('Create user page tests', () => {
  it('Renders form component', async () => {
    render(<CreateUserPage />);

    const form = await screen.findByRole('form');

    expect(form).toBeInTheDocument();
  });
});
