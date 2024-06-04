import Link from 'next/link';
import { useFormState } from 'react-dom';
import { Button, Input } from '@components';
import { FIELDS, INITIAL_STATE } from '../../constants';
import { handleCreateUserAction } from '../../hooks';

export function CreateUserForm() {
  const [state, formAction] = useFormState(handleCreateUserAction, INITIAL_STATE);

  function renderFormErrorMessage() {
    const { errorMessage } = state;
    const hasError: boolean = !!errorMessage;

    if (!hasError) return null;

    return (
      <div className='my-4 flex place-content-center text-justify'>
        <span className='text-red-500'>{errorMessage}</span>
      </div>
    );
  }

  function renderFormFields() {
    return FIELDS.map((field) => {
      const { label, name, type } = field;
      const fieldError: FormError | undefined = state.fieldErrors?.find(
        ({ field }) => field === name,
      );

      return (
        <Input
          id={name}
          name={name}
          label={label}
          type={type}
          error={fieldError}
          className=''
          key={name}
        />
      );
    });
  }

  return (
    <form
      role='form'
      action={formAction}
      className='flex h-full w-full flex-col items-center justify-center px-12'
    >
      {renderFormErrorMessage()}
      {renderFormFields()}
      <Button text='Login' type='submit' className='mb-1 mt-12' />
    </form>
  );
}
