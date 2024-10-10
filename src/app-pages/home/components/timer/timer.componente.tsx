'use client';

import { ArrowDown } from '@statics';
import { ADDITIONAL_FIELDS, TITLE_FIELD } from '../../constants';
import { useTimer } from './hooks/useTimer.hook';
import Image from 'next/image';

export function TaskTimer() {
  const { handleInputChange, task, handleAdditionalInfoButtonClick, isAdditionalInfoOpen } =
    useTimer();

  function renderAdditionalFieldsButton() {
    return (
      <button
        onClick={handleAdditionalInfoButtonClick}
        className='bg-background-light absolute bottom-0 left-0 flex h-6 w-6 items-center justify-center rounded-md'
      >
        <Image
          style={{ objectFit: 'contain' }}
          src={ArrowDown}
          width={20}
          alt='Ícone para abrir os inputs de informações adicionais da tarefa.'
          className='fill-icons-color'
        />
      </button>
    );
  }

  function renderTitleField() {
    const { name, placeholder } = TITLE_FIELD;

    return (
      <input
        key={name}
        placeholder={placeholder}
        name={name}
        onChange={handleInputChange}
        value={task[name]}
        className='bg-background-light h-full w-full border-none px-5 outline-none'
      />
    );
  }

  function renderAdditionalInputs() {
    return ADDITIONAL_FIELDS.map(({ name, placeholder, hasBorder }) => (
      <input
        key={name}
        placeholder={placeholder}
        name={name}
        onChange={handleInputChange}
        value={task[name]}
        className={`${hasBorder ? 'border-b-2 border-background-base' : 'border-none'} bg-background-light h-full w-full px-5 outline-none`}
      />
    ));
  }

  function renderInputs() {
    return (
      <div className='bg-background-light relative flex h-20 w-full items-center justify-start'>
        {renderTitleField()}
        {renderAdditionalFieldsButton()}
        <div className='transition-height absolute top-[calc(theme(spacing.20)+5px)] flex h-full w-full flex-col duration-200 ease-in-out'>
          {renderAdditionalInputs()}
        </div>
      </div>
    );
  }

  return renderInputs();
}
