import { CreateTaskResponse, CreateTaskTimeResponse, Task } from '@/types';

export interface TimerProps {
  onTaskCreation: (newTask: CreateTaskResponse) => void;
  task: Task;
  onTimerStart: () => void;
  resetTask: () => void;
  replayTask: Task | null;
  onTaskTimeCreation: (createdTaskTime: CreateTaskTimeResponse) => void;
}

export interface UseTimerProps {
  onTaskCreation: (newTask: CreateTaskResponse) => void;
  task: Task;
  onTimerStart: () => void;
  resetTask: () => void;
  replayTask: Task | null;
  onTaskTimeCreation: (createdTaskTime: CreateTaskTimeResponse) => void;
}

export interface UseTimer {
  handleTimerClick: () => Promise<void>;
  getButtonIcon: any;
  getTimerToShow: () => string;
  timer: number;
}
