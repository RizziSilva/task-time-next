export interface GetPaginatedTask {
  id: number;
  title: string;
  description: string;
  link: string;
}

export interface GetPaginatedTaskTime {
  initiatedAt: string;
  endedAt: string;
  totalTimeSpent: number;
  id: number;
  task: GetPaginatedTask;
}

export interface GroupedByDayTaskTimes {
  [key: string]: GetPaginatedTaskTime;
}

export interface CreateTaskTimeResponse {
  createdAt: string;
  updatedAt: string;
  initiatedAt: string;
  endedAt: string;
  taskId: number;
  timeSpent: number;
  id: number;
}
