import { CreateTaskResponse, Task } from '@/types';

export interface TimerProps {
  onTaskCreation: (newTask: CreateTaskResponse) => void;
  task: Task;
  onTimerStart: () => void;
  resetTask: () => void;
}

export interface UseTimerProps {
  onTaskCreation: (newTask: CreateTaskResponse) => void;
  task: Task;
  onTimerStart: () => void;
  resetTask: () => void;
}

export interface UseTimer {
  handleTimerClick: () => Promise<void>;
  getButtonIcon: any;
  getTimerToShow: () => string;
  timer: number;
}
