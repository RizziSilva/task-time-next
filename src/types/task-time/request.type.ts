export interface GetPaginatedTaskTimesRequest {
  page: number;
}

export interface CreateTaskTimeRequest {
  initiatedAt: Date;
  endedAt: Date;
  taskId: number;
}
