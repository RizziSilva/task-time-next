'use client';

import { TaskTimer } from './components';
import { useHome } from './hooks/useHome.hook';

export function HomePage() {
  const { onTaskCreation } = useHome();

  return (
    <div className='flex h-full w-full flex-col items-start justify-start'>
      <TaskTimer data-testid='test' onTaskCreation={onTaskCreation} />
    </div>
  );
}
