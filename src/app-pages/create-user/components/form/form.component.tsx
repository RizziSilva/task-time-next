'use client';

import { useFormState } from 'react-dom';
import { FormError } from '@types';
import { Button, Input } from '@components';
import { FIELDS, INITIAL_STATE } from '../../constants';
import { handleCreateUserAction } from '../../hooks';
import Image from 'next/image';
import { FullLogo } from '@/statics';
import Link from 'next/link';

export function CreateUserForm() {
  const [state, formAction] = useFormState(handleCreateUserAction, INITIAL_STATE);

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
    return FIELDS.map((field) => {
      const { label, name, type } = field;
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
          className=''
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
      <Button text='Criar conta' type='submit' className='mb-1 mt-4' />
      <span>
        Já possui uma conta?{' '}
        <Link className='cursor-pointer text-blue-500 underline' href='/auth/login'>
          Login!
        </Link>
      </span>
    </form>
  );
}
