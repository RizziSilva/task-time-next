import { CreateTaskResponse, CreateTaskTimeResponse, GetPaginatedTask, Task } from '@/types';
import { ChangeEvent } from 'react';

export interface TaskTimerProps {
  onTaskCreation: (newTask: CreateTaskResponse) => void;
  replayTask: Task | null;
  onTaskTimeCreation: (createdTaskTime: CreateTaskTimeResponse) => void;
}

export interface UseTaskTimer {
  task: Task;
  isAdditionalInfoOpen: boolean;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAdditionalInfoButtonClick: () => void;
  onTimerStart: () => void;
  resetTask: () => void;
}

export interface UseTaskTimerProps {
  replayTask: Task | null;
}
