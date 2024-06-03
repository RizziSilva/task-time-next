import { FullLogo } from '@statics';
import Image from 'next/image';

export function CreateUserForm() {
  return (
    <form role='form' className='flex h-full w-full flex-col items-center justify-center px-12'>
      <Image src={FullLogo} alt='Site logo' />
    </form>
  );
}
