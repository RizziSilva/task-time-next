'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { PlayIcon, StopIcon } from '@statics';
import { getFormmatedTimesFromSeconds } from '@utils';
import { createTaskAction } from '../actions/timer.action';
import { FIELD_KEYS, INITIAL_TASK_STATE } from '../../../constants';

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

  function handleStart() {
    const now = new Date();

    setTask({ ...task, [FIELD_KEYS.INITIATED_AT]: now });
  }

  async function handleStop() {
    const now = new Date();
    const body = { ...task, [FIELD_KEYS.ENDED_AT]: now };
    const actionResponse = await createTaskAction(body);

    if (actionResponse.error) toast.error(actionResponse.error);
    else {
      setNewTask(actionResponse.newTask);
      setTask(INITIAL_TASK_STATE);
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
