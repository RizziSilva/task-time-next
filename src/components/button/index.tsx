import { ButtonProps } from './types';

export function Button({ text, type, onClick, className }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} flex h-8 w-full items-center justify-center rounded-2xl bg-red-base text-white hover:bg-red-darken`}
    >
      {text}
    </button>
  );
}
