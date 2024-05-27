'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { FormError } from '@types';
import { Input, Button } from '@components';
import { FullLogo } from '@statics';
import { handleLoginAction } from '../../hooks/useLogin.hook';
import { INITIAL_STATE, FIELDS } from '../../constants';

export function LoginForm() {
  const [state, formAction] = useFormState(handleLoginAction, INITIAL_STATE);

  function renderFormErrorMessage() {
    const { errorMessage } = state;
    const hasError: boolean = !!errorMessage;

    if (!hasError) return null;

    return (
      <div className='my-4 flex place-content-center text-justify'>
        <span className='text-red-500'>{errorMessage}</span>
      </div>
    );
  }

  function renderFormFields() {
    const fieldErrors: Object | undefined = state.fieldErrors;

    return (
      <>
        <Input
          id={FIELDS.EMAIL.name}
          name={FIELDS.EMAIL.name}
          label={FIELDS.EMAIL.label}
          type={FIELDS.EMAIL.type}
          error={fieldErrors[FIELDS.EMAIL.name]}
          className='mb-7 mt-8'
        />
        <Input
          id={FIELDS.PASSWORD.name}
          name={FIELDS.PASSWORD.name}
          label={FIELDS.PASSWORD.label}
          type={FIELDS.PASSWORD.type}
          error={fieldErrors?[FIELDS.PASSWORD.name][0]}

        />
      </>
    );
  }

  return (
    <form
      role='form'
      action={formAction}
      className='flex h-full w-full flex-col items-center justify-center px-12'
    >
      <Image src={FullLogo} alt='Site logo' />
      {renderFormErrorMessage()}
      {renderFormFields()}
      <Button text='Login' type='submit' className='mb-1 mt-12' />
      <Link href={''}>
        <span className='hover:cursor-pointer'>Ou crie sua conta!</span>
      </Link>
    </form>
  );
}
