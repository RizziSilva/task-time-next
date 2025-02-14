import { CreateTaskResponse, CreateTaskTimeResponse, GetPaginatedTask } from '@/types';

export interface TaskListProps {
  onTaskReplay: (task: GetPaginatedTask) => void;
  newTask: CreateTaskResponse | null;
  newTaskTime: CreateTaskTimeResponse | null;
}

export interface UseTaskListProps {
  newTask: CreateTaskResponse | null;
  newTaskTime: CreateTaskTimeResponse | null;
}
