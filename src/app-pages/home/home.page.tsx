'use client';

import { TaskTimer } from './components';
import { useHome } from './hooks/useHome.hook';

export function HomePage() {
  const { newTask, setNewTask } = useHome();

  return (
    <div className='flex h-full w-full flex-col items-start justify-start'>
      <TaskTimer newTask={newTask} setNewTask={setNewTask} />
    </div>
  );
}
