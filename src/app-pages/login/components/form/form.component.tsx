'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { FormError } from '@types';
import { Input, Button } from '@components';
import { FullLogo } from '@statics';
import { handleLoginAction } from '../../hooks/useLogin.hook';
import { INITIAL_STATE, LOGIN_FIELDS } from '../../constants';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { ROUTES } from '@/constants';

export function LoginForm() {
  const [form, setForm] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();

    await signIn('credentials', {
      email: form.email,
      password: form.password,
      callbackUrl: ROUTES.TIMER,
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  }

  function renderFormErrorMessage() {
    const { errorMessage } = { errorMessage: '' };
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
      const fieldError: FormError | undefined = { fieldErrors: [] }.fieldErrors?.find(
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
          onChange={handleChange}
        />
      );
    });
  }

  return (
    <form role='form' className='flex h-full w-full flex-col items-center justify-center p-12'>
      <Image src={FullLogo} alt='Site logo' className='mb-10' />
      {renderFormErrorMessage()}
      {renderFormFields()}
      <Button
        onClick={handleSubmit}
        shouldUseLoading={true}
        text='Login'
        type='submit'
        className='mb-1 mt-4'
      />
      <Link href='/auth/create'>
        <span className='hover:cursor-pointer'>Ou crie sua conta!</span>
      </Link>
    </form>
  );
}
