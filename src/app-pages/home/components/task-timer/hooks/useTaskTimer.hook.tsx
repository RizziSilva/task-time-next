import { ChangeEvent, useEffect, useState } from 'react';
import { Task } from '@/types';
import { FIELD_KEYS, INITIAL_TASK_STATE } from '../../../constants';
import { UseTaskTimer, UseTaskTimerProps } from '../types';

export function useTaskTimer({ replayTask }: UseTaskTimerProps): UseTaskTimer {
  const [task, setTask] = useState<Task>(INITIAL_TASK_STATE);
  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState<boolean>(false);

  useEffect(() => {
    function handleReplayTask() {
      if (replayTask) {
        setTask(replayTask);

        onTimerStart();
      }
    }

    handleReplayTask();
  }, [replayTask]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setTask({ ...task, [name]: value });
  }

  function handleAdditionalInfoButtonClick() {
    setIsAdditionalInfoOpen(!isAdditionalInfoOpen);
  }

  function onTimerStart() {
    const now = new Date();

    setTask((currentTask) => ({ ...currentTask, [FIELD_KEYS.INITIATED_AT]: now }));
  }

  function resetTask() {
    setTask(INITIAL_TASK_STATE);
  }

  return {
    handleInputChange,
    task,
    handleAdditionalInfoButtonClick,
    isAdditionalInfoOpen,
    onTimerStart,
    resetTask,
  };
}
