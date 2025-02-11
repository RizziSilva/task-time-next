'use client';

import { TaskList, TaskTimer } from './components';
import { useHome } from './hooks/useHome.hook';

export function HomePage() {
  const { onTaskCreation, onTaskTimeCreation, newTaskTime, onTaskReplay, replayTask, newTask } =
    useHome();

  return (
    <div className='flex h-full w-full flex-col items-start justify-start'>
      <TaskTimer
        replayTask={replayTask}
        onTaskCreation={onTaskCreation}
        onTaskTimeCreation={onTaskTimeCreation}
      />
      <TaskList newTask={newTask} onTaskReplay={onTaskReplay} newTaskTime={newTaskTime} />
    </div>
  );
}
