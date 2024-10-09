import { ChangeEvent, useState } from 'react';
import { INITIAL_STATE } from '../../../constants';

export function useTimer() {
  const [task, setTask] = useState(INITIAL_STATE);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setTask({ ...task, [name]: value });
  }

  return {
    handleInputChange,
    task,
  };
}
