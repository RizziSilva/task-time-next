export interface Task {
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
  task: Task;
}
