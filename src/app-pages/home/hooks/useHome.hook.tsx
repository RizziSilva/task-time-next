'use client';

import { useState } from 'react';
import { CreateTaskResponse, CreateTaskTimeResponse, GetPaginatedTask, Task } from '@types';
import { UseHome } from '../types';

export function useHome(): UseHome {
  const [newTask, setNewTask] = useState<CreateTaskResponse | null>(null);
  const [newTaskTime, setNewTaskTime] = useState<CreateTaskTimeResponse | null>(null);
  const [replayTask, setReplayTask] = useState<Task | null>(null);

  function onTaskCreation(createdTask: CreateTaskResponse) {
    setNewTask(createdTask);
  }

  function onTaskTimeCreation(createdTaskTime: CreateTaskTimeResponse) {
    setNewTaskTime(createdTaskTime);
  }

  function onTaskReplay(task: GetPaginatedTask) {
    const taskInfo: Task = {
      description: task.description,
      link: task.link,
      title: task.title,
      id: task.id,
      endedAt: undefined,
      initiatedAt: undefined,
    };

    setReplayTask(taskInfo);
  }

  return { onTaskReplay, replayTask, newTask, onTaskCreation, onTaskTimeCreation, newTaskTime };
}
