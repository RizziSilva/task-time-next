'use client';

import { useEffect, useState } from 'react';
import { PlayIcon, StopIcon } from '@statics';
import { getFormmatedTimesFromSeconds } from '@utils';
import { createTaskAction } from '../actions/timer.action';
import { FIELD_KEYS } from '../../../constants';
import { UseTimer, UseTimerProps } from '../types';
import { CreateTaskResponse } from '@/types';

export function useTimer({
  onTaskCreation,
  onTimerStart,
  resetTask,
  task,
}: UseTimerProps): UseTimer {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  let count: NodeJS.Timeout;

  useEffect(() => {
    if (isPlaying) {
      count = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!isPlaying) {
      setTimer(0);
      clearInterval(count);
    }

    return () => {
      clearInterval(count);
    };
  }, [isPlaying]);

  function getTimerToShow(): string {
    const values = getFormmatedTimesFromSeconds(timer);

    return `${values.hours}:${values.minutes}:${values.seconds}`;
  }

  function handleStart() {
    onTimerStart();
  }

  async function handleStop() {
    const now = new Date();
    const body = { ...task, [FIELD_KEYS.ENDED_AT]: now };
    const createdTask: CreateTaskResponse | undefined = await createTaskAction(body);

    if (createdTask) {
      onTaskCreation(createdTask);
      resetTask();
    }
  }

  function handleTimerClick() {
    if (!isPlaying) handleStart();
    else handleStop();

    setIsPlaying(!isPlaying);
  }

  function getButtonIcon() {
    return isPlaying ? StopIcon : PlayIcon;
  }

  return { handleTimerClick, getButtonIcon, getTimerToShow, timer };
}
