import { Task } from '@/types';

export interface TimerProps {
  onTaskCreation: (newTask: Task) => void;
  task: Task;
  onTimerStart: () => void;
  resetTask: () => void;
}

export interface UseTimer {
  onTaskCreation: (newTask: Task) => void;
  task: Task;
  onTimerStart: () => void;
  resetTask: () => void;
}
