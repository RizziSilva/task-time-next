import { ButtonProps } from './types';

export function Button({ text, className }: ButtonProps) {
  return (
    <button
      className={`${className} bg-red-base hover:bg-red-darken flex h-8 w-full items-center justify-center rounded-2xl text-white`}
    >
      {text}
    </button>
  );
}
