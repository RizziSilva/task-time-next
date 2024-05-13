import { InputProps } from './types';

export function Input({ className, label, name, id, type }: InputProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <span className='absolute bottom-full left-1.5 leading-full'>{label}</span>
      <input
        type={type || 'text'}
        id={id}
        name={name}
        className='h-8 w-full rounded-xl border border-solid border-black pl-1'
      />
    </div>
  );
}
