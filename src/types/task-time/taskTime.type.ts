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
