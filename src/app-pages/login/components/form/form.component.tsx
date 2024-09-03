'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { FormError } from '@types';
import { ROUTES } from '@/constants';
import { Input, Button } from '@components';
import { FullLogo } from '@statics';
import { handleLoginAction } from '../../hooks/useLogin.hook';
import { INITIAL_STATE, LOGIN_FIELDS } from '../../constants';
import { LoginResponseType } from '@/types/login';

export function LoginForm() {
  const [state, formAction] = useFormState(handleLoginAction, INITIAL_STATE);

  useEffect(() => {
    async function handleSignIn() {
      const user: LoginResponseType | undefined = state.user;

      await signIn('credentials', {
        user: JSON.stringify(user),
        callbackUrl: ROUTES.TIMER,
      });
    }

    const isValid: boolean = state.isValid;

    if (isValid) handleSignIn();
  }, [state.isValid]);

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
      <Button shouldUseLoading={true} text='Login' type='submit' className='mb-1 mt-4' />
      <Link href='/auth/create'>
        <span className='hover:cursor-pointer'>Ou crie sua conta!</span>
      </Link>
    </form>
  );
}
