import { CreateTaskResponse, CreateTaskTimeResponse, GetPaginatedTask, Task } from '@/types';

export interface UseHome {
  newTask: CreateTaskResponse | null;
  onTaskCreation: (createdTask: CreateTaskResponse) => void;
  replayTask: Task | null;
  onTaskReplay: (task: GetPaginatedTask) => void;
  onTaskTimeCreation: (createdTaskTime: CreateTaskTimeResponse) => void;
  newTaskTime: CreateTaskTimeResponse | null;
}
