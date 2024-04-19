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

  return (
    <form
      action={formAction}
      className='flex h-full w-full flex-col items-center justify-center px-12'
    >
      <Image src={FullLogo} alt='Site logo' />
      <Input
        id={FIELDS.EMAIL.name}
        name={FIELDS.EMAIL.name}
        label={FIELDS.EMAIL.label}
        className='mb-7 mt-8'
      />
      <Input id={FIELDS.PASSWORD.name} name={FIELDS.PASSWORD.name} label={FIELDS.PASSWORD.label} />
      <Button
        text='Login'
        type='submit'
        onClick={() => console.log('submit')}
        className='mb-1 mt-12'
      />
      <Link href={''}>
        <span className='hover:cursor-pointer'>Ou crie sua conta!</span>
      </Link>
    </form>
  );
}
