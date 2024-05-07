'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { Input, Button } from '@components';
import { FullLogo } from '@statics';
import { INITIAL_STATE, FIELDS } from '../../constants';
import { handleLoginAction } from '../../useLogin.hook';

export function LoginForm() {
  const [state, formAction] = useFormState(handleLoginAction, INITIAL_STATE);

  function getErrorMessage() {
    const { errorMessage } = state;
    const hasError: boolean = !!errorMessage;

    if (!hasError) return null;

    return (
      <div className='my-4 flex place-content-center text-justify'>
        <span className='text-red-500'>{errorMessage}</span>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className='flex h-full w-full flex-col items-center justify-center px-12'
    >
      <Image src={FullLogo} alt='Site logo' />
      {getErrorMessage()}
      <Input
        id={FIELDS.EMAIL.name}
        name={FIELDS.EMAIL.name}
        label={FIELDS.EMAIL.label}
        type={FIELDS.EMAIL.type}
        className='mb-7 mt-8'
      />
      <Input
        id={FIELDS.PASSWORD.name}
        name={FIELDS.PASSWORD.name}
        label={FIELDS.PASSWORD.label}
        type={FIELDS.PASSWORD.type}
      />
      <Button text='Login' type='submit' className='mb-1 mt-12' />
      <Link href={''}>
        <span className='hover:cursor-pointer'>Ou crie sua conta!</span>
      </Link>
    </form>
  );
}
