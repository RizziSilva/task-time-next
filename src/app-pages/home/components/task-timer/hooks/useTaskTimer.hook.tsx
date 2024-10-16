import { ChangeEvent, useState } from 'react';
import { INITIAL_TASK_STATE } from '../../../constants';

export function useTimer() {
  const [task, setTask] = useState(INITIAL_TASK_STATE);
  const [isAdditionalInfoOpen, setIsAdditionalInfoOpen] = useState(false);

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
