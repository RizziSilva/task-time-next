import { Input } from '@components';

export default function LoginPage() {
  return (
    <div className='bg-white w-96 h-22 rounded'>
      <form className='flex h-full w-full flex-col items-center justify-center'>
        <Input />
        <Input />
      </form>
    </div>
  );
}
