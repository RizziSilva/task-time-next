'use client';

import { TaskList, TaskTimer } from './components';
import { useHome } from './hooks/useHome.hook';

export function HomePage() {
  const { onTaskCreation } = useHome();

  return (
    <div className='flex h-full w-full flex-col items-start justify-start'>
      <TaskTimer onTaskCreation={onTaskCreation} />
      <TaskList />
    </div>
  );
}
