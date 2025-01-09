'use client';

import { useState } from 'react';
import { CreateTaskResponse } from '@types';
import { UseHome } from '../types';

export function useHome(): UseHome {
  const [newTask, setNewTask] = useState<CreateTaskResponse | null>(null);

  function onTaskCreation(createdTask: CreateTaskResponse) {
    setNewTask(createdTask);
  }

  return { newTask, onTaskCreation };
}
