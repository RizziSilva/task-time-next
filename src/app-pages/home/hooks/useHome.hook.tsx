'use client';

import { useState } from 'react';

export function useHome() {
  const [newTask, setNewTask] = useState({});

  return { newTask, setNewTask };
}
