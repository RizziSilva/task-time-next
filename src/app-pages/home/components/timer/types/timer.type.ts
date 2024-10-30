import { Task } from '@/types';

export interface TimerProps {
  onTaskCreation: (newTask: Task) => void;
  task: Task;
  onTimerStart: () => void;
  resetTask: () => void;
}

export interface UseTimerProps {
  onTaskCreation: (newTask: Task) => void;
  task: Task;
  onTimerStart: () => void;
  resetTask: () => void;
}

export interface UseTimer {
  handleTimerClick: () => void;
  getButtonIcon: any;
  getTimerToShow: () => string;
  timer: number;
}
