import { ChangeEvent, useState } from 'react';
import { Task } from '@/types';
import { INITIAL_TASK_STATE } from '../../../constants';

export function useTimer() {
  const [task, setTask] = useState<Task>(INITIAL_TASK_STATE);
  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState<boolean>(false);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setTask({ ...task, [name]: value });
  }

  function handleAdditionalInfoButtonClick() {
    setIsAdditionalInfoOpen(!isAdditionalInfoOpen);
  }

  return {
    handleInputChange,
    task,
    handleAdditionalInfoButtonClick,
    isAdditionalInfoOpen,
    setTask,
  };
}
