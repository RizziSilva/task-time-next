import { useFormState } from 'react-dom';
import Link from 'next/link';
import { Input, Button } from '@components';
import { FullLogo } from '@statics';
import Image from 'next/image';

export function LoginPage() {
  const [state, formAction] = useFormState(action, null);

  return (
    <div className='h-22 w-96 rounded-xl bg-white'>
      <form className='flex h-full w-full flex-col items-center justify-center px-12'>
        <Image src={FullLogo} alt='Site logo' />
        <Input label='Email' className='mb-7 mt-8' />
        <Input label='Password' />
        <Button
          text='Login'
          onClick={() => console.log('handle user login')}
          className='mb-1 mt-12'
        />
        <Link href={''}>
          <span className='hover:cursor-pointer'>Ou crie sua conta!</span>
        </Link>
      </form>
    </div>
  );
}
