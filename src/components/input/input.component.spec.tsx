import { render, screen } from '@testing-library/react';
import { FormError } from '@types';
import { Input } from './input.component';

describe('Input component tests', () => {
  it('Render input correctly', async () => {
    const label: string = 'Input Teste';

    render(<Input id='1' label={label} name='test input' />);

    const input = await screen.findByRole('textbox', {
      name: label,
    });

    expect(input).toBeInTheDocument();
  });

  it('Render input with error', async () => {
    const label: string = 'Input Teste';
    const name: string = 'test input';
    const errorMessageText: string = 'Invalid value';
    const error: FormError = { field: name, message: errorMessageText };

    render(<Input id='1' label={label} name={name} error={error} />);

    const input = await screen.findByRole('textbox', {
      name: label,
    });
    const errorMessage = await screen.findByText(errorMessageText);

    expect(input).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });
});
