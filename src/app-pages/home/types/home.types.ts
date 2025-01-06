import { CreateTaskResponse } from '@/types';

export interface UseHome {
  newTask: CreateTaskResponse | null;
  onTaskCreation: (newTask: CreateTaskResponse) => void;
}
