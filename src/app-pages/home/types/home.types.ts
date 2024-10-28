import { Task } from '@/types';

export interface UseHome {
  newTask: Task | null;
  onTaskCreation: (newTask: Task) => void;
}
