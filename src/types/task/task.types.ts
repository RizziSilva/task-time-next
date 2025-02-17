export interface TitleInput {
  name: keyof Task;
  placeholder: string;
}

export interface AdditionalInput {
  name: keyof Task;
  placeholder: string;
  hasBorder: boolean;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  link: string;
  initiatedAt: Date | undefined;
  endedAt: Date | undefined;
}

export interface TaskTime {
  createdAt: string;
  updatedAt: string;
  initiatedAt: string;
  endedAt: string;
  timeSpent: number;
  id: number;
}

export interface Task {
  title: string;
  description: string;
  link: string;
  initiatedAt: Date | undefined;
  endedAt: Date | undefined;
  id?: number;
}

export interface CreateTaskResponse {
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  link: string;
  id: number;
  times: TaskTime[];
  totalTimeSpent: number;
}
