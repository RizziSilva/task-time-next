import { InputProps } from './types';
import { BUTTON_CLASSES } from './style';

export function Input({ className, label, name, id, type, error }: InputProps) {
  const hasError: boolean = !!error;

  function getInputClass() {
    return hasError ? BUTTON_CLASSES.ERROR.input : BUTTON_CLASSES.DEFAULT.input;
  }

  function renderErrorMessage() {
    if (hasError)
      return (
        <span className='absolute left-0 top-full pl-1.5 leading-full text-error-red'>
          {error?.message}
        </span>
      );

    return null;
  }

  return (
    <div className={`relative mb-9 w-full ${className}`}>
      <label htmlFor={id} className='absolute bottom-full left-1.5 leading-full text-black'>
        {label}
      </label>
      <input
        type={type || 'text'}
        id={id}
        name={name}
        className={`h-8 w-full rounded-xl border border-solid border-black pl-1 ${getInputClass()}`}
      />
      {renderErrorMessage()}
    </div>
  );
}
