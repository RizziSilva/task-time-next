'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { FormError } from '@types';
import { Input, Button } from '@components';
import { FullLogo } from '@statics';
import { handleLoginAction } from '../../hooks/useLogin.hook';
import { INITIAL_STATE, LOGIN_FIELDS } from '../../constants';

export function LoginForm() {
  const [state, formAction] = useFormState(handleLoginAction, INITIAL_STATE);

  function renderFormErrorMessage() {
    const { errorMessage } = state;
    const hasError: boolean = !!errorMessage;

    if (!hasError) return null;

    return (
      <div className='mb-6 flex place-content-center text-justify'>
        <span className='text-red-500'>{errorMessage}</span>
      </div>
    );
  }

  function renderFormFields() {
    return LOGIN_FIELDS.map((field) => {
      const { label, name, type, className } = field;
      const fieldError: FormError | undefined = state.fieldErrors?.find(
        ({ field }) => field === name,
      );

      return (
        <Input
          id={name}
          name={name}
          label={label}
          type={type}
          error={fieldError}
          className={className}
          key={name}
        />
      );
    });
  }

  return (
    <form
      role='form'
      action={formAction}
      className='flex h-full w-full flex-col items-center justify-center p-12'
    >
      <Image src={FullLogo} alt='Site logo' className='mb-10' />
      {renderFormErrorMessage()}
      {renderFormFields()}
      <Button text='Login' type='submit' className='mb-1 mt-4' />
      <Link href='/auth/create'>
        <span className='hover:cursor-pointer'>Ou crie sua conta!</span>
      </Link>
    </form>
  );
}
