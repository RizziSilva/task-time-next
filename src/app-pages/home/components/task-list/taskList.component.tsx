import { UseTaskList } from './hooks/useTaskList.hook';

export function TaskList({}) {
  const { tasks } = UseTaskList();

  function renderDay() {
    return (
      <div className=' mb-8 flex w-full flex-col items-start justify-start bg-background-light '>
        <div className='pl-50px h-50px flex w-full items-center justify-between pr-20'>
          <span className='text-snuff-font-color flex h-full w-fit items-center text-sm font-semibold'>
            Fri, 10 Jan
          </span>
          <span className='text-snuff-font-color flex h-full w-fit items-center text-sm font-semibold'>
            5:50:12
          </span>
        </div>
        <div className='pl-50px h-50px border-b-task-border-color flex w-full items-center justify-between border-b-[1px] pr-20'>
          <span className='text-snuff-font-color flex h-full w-fit items-center text-sm font-semibold'>
            2000 - Criar a listagem de tarefas para home
          </span>
          <div className='flex h-full w-fit items-center'>
            <span className='mr-10 flex h-full w-fit items-center text-sm font-semibold text-timer-input-placeholder-font-color'>
              8:00 AM - 10:00 AM
            </span>
            <span className='text-snuff-font-color flex h-full w-fit items-center text-sm font-semibold'>
              2:00:00
            </span>
          </div>
        </div>
      </div>
    );
  }

  return <div className='mt-16 flex w-full flex-col justify-start'>{renderDay()}</div>;
}
