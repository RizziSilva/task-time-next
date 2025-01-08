'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { PlayIcon, StopIcon } from '@statics';
import { CreateTaskResponse, Task } from '@types';
import { createTask } from '@services';
import { getErrorMessage, getFormmatedTimesFromSeconds } from '@utils';
import { CREATE_TASK_ERROR_MESAGE, FIELD_KEYS } from '../../../constants';
import { UseTimer, UseTimerProps } from '../types';

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

  async function createTaskAction(task: Task): Promise<void> {
    try {
      const newTask: CreateTaskResponse = await createTask(task);

      onTaskCreation(newTask);
      resetTask();
    } catch (error) {
      console.error(error);

      const errorMessage = getErrorMessage(error, CREATE_TASK_ERROR_MESAGE);
      toast.error(errorMessage);
    }
  }

  async function handleStop() {
    const now = new Date();
    const body = { ...task, [FIELD_KEYS.ENDED_AT]: now };
    await createTaskAction(body);
  }

  async function handleTimerClick() {
    if (!isPlaying) handleStart();
    else await handleStop();

    setIsPlaying(!isPlaying);
  }

  function getButtonIcon() {
    return isPlaying ? StopIcon : PlayIcon;
  }

  return { handleTimerClick, getButtonIcon, getTimerToShow, timer };
}
