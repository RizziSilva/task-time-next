'use client';

import { useFormStatus } from 'react-dom';
import { TEST_IDS } from '@constants';
import { ButtonProps } from './types';

export function Button({ text, type, onClick, className, shouldUseLoading }: ButtonProps) {
  const { pending } = useFormStatus();
  const isLoading: boolean = !!shouldUseLoading && pending;

  function renderButtonContent() {
    if (!isLoading) return text;

    return (
      <div
        data-testid={TEST_IDS.BUTTON_LOADER}
        className='mr-3 h-5 w-5 animate-spin rounded-full border-b-2 border-white bg-transparent'
      />
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      data-testid={TEST_IDS.DEFAULT_BUTTON}
      className={`${isLoading ? 'cursor-wait opacity-50' : ''} ${className} flex h-8 w-full items-center justify-center rounded-2xl bg-red-base text-white hover:bg-red-darken`}
    >
      {renderButtonContent()}
    </button>
  );
}
