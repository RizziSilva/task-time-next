import { Task } from '@/types';
import { ChangeEvent } from 'react';

export interface TaskTimerProps {
  onTaskCreation: (newTask: Task) => void;
}

export interface UseTaskTimer {
  task: Task;
  isAdditionalInfoOpen: boolean;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAdditionalInfoButtonClick: () => void;
  onTimerStart: () => void;
  resetTask: () => void;
}
