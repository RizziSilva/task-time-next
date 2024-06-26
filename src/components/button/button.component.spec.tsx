import * as reactDom from 'react-dom';
import { render, screen } from '@testing-library/react';
import { TEST_IDS } from '@constants';
import { Button } from './button.component';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormStatus: jest.fn(),
}));

describe('Button component tests', () => {
  it('Renders Button correctly', async () => {
    const buttonText: string = 'Test';
    const formStatus: reactDom.FormStatus = {
      pending: false,
      method: null,
      action: null,
      data: null,
    };

    jest.spyOn(reactDom, 'useFormStatus').mockImplementation(() => formStatus);

    render(<Button text={buttonText} type='button' />);

    const button = await screen.findByRole('button', { name: buttonText });

    expect(button).toBeInTheDocument();
  });

  it('Renders Button without shouldUseLoading and with pending true without showing loading correctly', async () => {
    const buttonText: string = 'Pending';
    const formStatus: reactDom.FormStatus = {
      pending: true,
      method: '',
      action: '',
      data: new FormData(),
    };

    jest.spyOn(reactDom, 'useFormStatus').mockImplementation(() => formStatus);

    render(<Button text={buttonText} type='button' shouldUseLoading={false} />);

    const button = await screen.findByRole('button', { name: buttonText });

    expect(button).toBeInTheDocument();
  });

  it('Renders Button with shouldUseLoading and without pending with label correctly', async () => {
    const buttonText: string = 'Pending';
    const formStatus: reactDom.FormStatus = {
      pending: false,
      method: null,
      action: null,
      data: null,
    };

    jest.spyOn(reactDom, 'useFormStatus').mockImplementation(() => formStatus);

    render(<Button text={buttonText} type='button' shouldUseLoading={true} />);

    const buttonByLabel = await screen.findByRole('button', { name: buttonText });

    expect(buttonByLabel).toBeInTheDocument();
  });

  it('Renders Button with shouldUseLoading and with pending without label correctly', async () => {
    const buttonText: string = 'Pending';
    const formStatus: reactDom.FormStatus = {
      pending: true,
      method: '',
      action: '',
      data: new FormData(),
    };

    jest.spyOn(reactDom, 'useFormStatus').mockImplementation(() => formStatus);

    render(<Button text={buttonText} type='button' shouldUseLoading={true} />);

    const div = await screen.findByTestId(TEST_IDS.BUTTON_LOADER);
    const buttonByTestId = await screen.findByTestId('default-button');

    expect(buttonByTestId).toBeInTheDocument();
    expect(div).toBeInTheDocument();
  });
});
