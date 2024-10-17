'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { PlayIcon, StopIcon } from '@statics';
import { getErrorMessage, getFormmatedTimesFromSeconds } from '@utils';
import { createTask } from '@services';
import { CREATE_TASK_ERROR_MESAGE, FIELD_KEYS, INITIAL_TASK_STATE } from '../../../constants';

export function useTimer(setNewTask, task, setTask) {
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

  async function handleCreateTask() {
    try {
      const now = new Date();
      const body = { ...task, [FIELD_KEYS.ENDED_AT]: now };
      const { data } = await createTask(body);

      setNewTask(data);
      setTask(INITIAL_TASK_STATE);
    } catch (error) {
      console.error(error);

      const errorMessage = getErrorMessage(error, CREATE_TASK_ERROR_MESAGE);

      toast.error(errorMessage);
    }
  }

  async function handleTimerClick() {
    if (!isPlaying) {
      const now = new Date();

      setTask({ ...task, [FIELD_KEYS.INITIATED_AT]: now });
    } else await handleCreateTask();

    setIsPlaying(!isPlaying);
  }

  function getButtonIcon() {
    return isPlaying ? StopIcon : PlayIcon;
  }

  return { handleTimerClick, getButtonIcon, getTimerToShow, timer };
}
