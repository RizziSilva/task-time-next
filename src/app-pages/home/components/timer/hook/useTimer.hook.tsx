'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { PlayIcon, StopIcon } from '@statics';
import { CreateTaskResponse, CreateTaskTimeRequest, Task } from '@types';
import { createTask, createTaskTime } from '@services';
import { getErrorMessage, getFormmatedTimesFromSeconds } from '@utils';
import {
  CREATE_TASK_ERROR_MESSAGE,
  CREATE_TASK_TIME_ERROR_MESSAGE,
  FIELD_KEYS,
} from '../../../constants';
import { UseTimer, UseTimerProps } from '../types';

export function useTimer({
  onTaskCreation,
  onTimerStart,
  resetTask,
  task,
  replayTask,
  onTaskTimeCreation,
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

  useEffect(() => {
    function startTimerOnReplayTask() {
      const shoudlStartReplay: boolean = !isPlaying && !!replayTask;

      if (shoudlStartReplay) handleTimerClick();
    }

    startTimerOnReplayTask();
  }, [replayTask]);

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

      const errorMessage = getErrorMessage(error, CREATE_TASK_ERROR_MESSAGE);
      toast.error(errorMessage);
    }
  }

  async function createTaskTimeAction(task: Task) {
    try {
      const requestBody: CreateTaskTimeRequest = {
        endedAt: task.endedAt as Date,
        initiatedAt: task.initiatedAt as Date,
        taskId: task.id as number,
      };

      const createdTaskTime = await createTaskTime(requestBody);

      onTaskTimeCreation(createdTaskTime);
      resetTask();
    } catch (error) {
      console.error(error);

      const errorMessage: string = getErrorMessage(error, CREATE_TASK_TIME_ERROR_MESSAGE);
      toast.error(errorMessage);
    }
  }

  async function handleStop() {
    const now = new Date();
    const body = { ...task, [FIELD_KEYS.ENDED_AT]: now };
    const isReplayingTask: boolean = !!replayTask;

    if (isReplayingTask) await createTaskTimeAction(body);
    else await createTaskAction(body);
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
