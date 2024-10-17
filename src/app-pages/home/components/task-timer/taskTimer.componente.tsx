'use client';

import Image from 'next/image';
import { ArrowDown } from '@statics';
import { AdditionalInput } from '@types';
import { ADDITIONAL_FIELDS, TEST_IDS, TITLE_FIELD } from '../../constants';
import { useTimer } from './hooks/useTaskTimer.hook';
import { Timer } from '../timer/timer';

export function TaskTimer({ setNewTask }) {
  const {
    handleInputChange,
    task,
    setTask,
    handleAdditionalInfoButtonClick,
    isAdditionalInfoOpen,
  } = useTimer();

  function renderAdditionalFieldsButton() {
    return (
      <button
        data-testid={TEST_IDS.ADDITIONAL_INFO_BUTTON}
        onClick={handleAdditionalInfoButtonClick}
        className='absolute bottom-0 left-0 flex h-6 w-6 items-center justify-center rounded-md bg-background-light'
      >
        <Image
          style={{ objectFit: 'contain' }}
          src={ArrowDown}
          width={20}
          alt='Ícone para abrir os inputs de informações adicionais da tarefa.'
          className={`${isAdditionalInfoOpen ? '' : 'rotate-180'} fill-icons-color transition-transform duration-200 ease-in-out`}
          data-testid={TEST_IDS.ADDITIONAL_INFO_ICON}
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
        className='h-full w-full border-none bg-background-light px-5 text-timer-input-font-color outline-none placeholder:text-timer-input-placeholder-font-color'
      />
    );
  }

  function renderAdditionalInputs() {
    return ADDITIONAL_FIELDS.map(({ name, placeholder, hasBorder }: AdditionalInput) => (
      <input
        key={name}
        placeholder={placeholder}
        name={name}
        onChange={handleInputChange}
        value={task[name]}
        className={`${hasBorder ? 'border-b-2 border-background-base' : 'border-none'} h-full w-full bg-background-light px-5 text-timer-input-font-color outline-none placeholder:text-timer-input-placeholder-font-color`}
      />
    ));
  }

  function renderInputs() {
    return (
      <div className='relative flex h-20 w-full items-center justify-start bg-background-light'>
        {renderTitleField()}
        {renderAdditionalFieldsButton()}
        <Timer setNewTask={setNewTask} task={task} setTask={setTask} />
        <div
          className={`${isAdditionalInfoOpen ? 'h-full' : 'h-0'} absolute top-[calc(theme(spacing.20)+2px)] flex  w-full flex-col transition-height duration-200 ease-in-out`}
          data-testid={TEST_IDS.ADDITIONAL_INFO_CONTAINER}
        >
          {renderAdditionalInputs()}
        </div>
      </div>
    );
  }

  return renderInputs();
}
