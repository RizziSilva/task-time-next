import { InputProps } from './types';

export function Input({ className, label }: InputProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <span className='leading-full absolute bottom-full left-1.5'>{label}</span>
      <input className='h-8 w-full rounded-xl border border-solid border-black' />
    </div>
  );
}
