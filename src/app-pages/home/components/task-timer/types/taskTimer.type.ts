import { CreateTaskResponse, Task } from '@/types';
import { ChangeEvent } from 'react';

export interface TaskTimerProps {
  onTaskCreation: (newTask: CreateTaskResponse) => void;
}

export interface UseTaskTimer {
  task: Task;
  isAdditionalInfoOpen: boolean;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAdditionalInfoButtonClick: () => void;
  onTimerStart: () => void;
  resetTask: () => void;
}
