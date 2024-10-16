import { useEffect, useState } from 'react';
import { PlayIcon, StopIcon } from '@statics';
import { getErrorMessage, getFormmatedTimesFromSeconds } from '@utils';
import { CREATE_TASK_ERROR_MESAGE, FIELD_KEYS, INITIAL_TASK_STATE } from '../../../constants';
import { createTask } from '@/services';

export function useTimer(setNewTask, task, setTask) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
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

  function getTimerToShow() {
    const values = getFormmatedTimesFromSeconds(timer);

    return `${values.hours}:${values.minutes}:${values.seconds}`;
  }

  async function handleCreateTask() {
    try {
      const now = new Date();
      const body = { ...task, [FIELD_KEYS.ENDED_AT]: now };
      const { data } = await createTask(body);
      console.log('tarefa criada', data);
      setNewTask(data);
      setTask(INITIAL_TASK_STATE);
    } catch (error) {
      console.error(error);
      // TODO silva.william: Adicionar toaster para aviso de erros ou adicionar tratativa de aviso para esse caso.
      // const errorMessage = getErrorMessage(error, CREATE_TASK_ERROR_MESAGE);
    }
  }

  function handleTimerClick() {
    if (!isPlaying) {
      const now = new Date();

      setTask({ ...task, [FIELD_KEYS.INITIATED_AT]: now });
    } else handleCreateTask();

    setIsPlaying(!isPlaying);
  }

  function getButtonIcon() {
    return isPlaying ? StopIcon : PlayIcon;
  }

  return { handleTimerClick, getButtonIcon, getTimerToShow, timer };
}
