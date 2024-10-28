'use client';

import Image from 'next/image';
import { useTimer } from './hook/useTimer.hook';
import { TimerProps } from './types';

export function Timer({ onTaskCreation, task, onTimerStart, resetTask }: TimerProps) {
  const { getButtonIcon, handleTimerClick, getTimerToShow } = useTimer({
    onTaskCreation,
    task,
    onTimerStart,
    resetTask,
  });

  function renderPlayStopButton() {
    return (
      <button
        onClick={handleTimerClick}
        className='flex h-[40px] w-[40px] items-center justify-center'
      >
        <Image width={50} height={50} src={getButtonIcon()} alt='Ícone do botão do timer' />
      </button>
    );
  }

  function renderTimer() {
    return (
      <div className='mr-4 flex items-center justify-center text-timer-input-placeholder-font-color'>
        <span>{getTimerToShow()}</span>
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center pr-4'>
      {renderTimer()}
      {renderPlayStopButton()}
    </div>
  );
}
