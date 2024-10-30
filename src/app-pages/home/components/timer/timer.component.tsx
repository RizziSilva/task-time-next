'use client';

import Image from 'next/image';
import { useTimer } from './hook/useTimer.hook';
import { TimerProps } from './types';
import { TEST_IDS } from '../../constants';

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
        <Image
          data-testid={TEST_IDS.TIMER_BUTTON_IMAGE}
          width={50}
          height={50}
          src={getButtonIcon()}
          alt='Ícone do botão do timer'
        />
      </button>
    );
  }

  function renderTimer() {
    return (
      <div className='mr-4 flex items-center justify-center text-timer-input-placeholder-font-color'>
        <span data-testid={TEST_IDS.TIMER_TEXT}>{getTimerToShow()}</span>
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
