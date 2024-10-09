'use client';

import { FIELDS } from '../../constants';
import { useTimer } from './hooks/useTimer.hook';

export function TaskTimer() {
  const { handleInputChange, task } = useTimer();

  function renderInputs() {
    return FIELDS.map(({ name, placeholder }) => (
      <input
        key={name}
        placeholder={placeholder}
        name={name}
        onChange={handleInputChange}
        value={task[name]}
      />
    ));
  }

  return <div className='flex flex-auto flex-col items-start'>{renderInputs()}</div>;
}
