'use client';

import { useState } from 'react';
import { Task } from '@types';
import { UseHome } from '../types';

export function useHome(): UseHome {
  const [newTask, setNewTask] = useState<Task | null>(null);

  function onTaskCreation(createdTask: Task) {
    setNewTask(createdTask);
  }

  return { newTask, onTaskCreation };
}
