import { GetPaginatedTaskTime } from '@/types';
import { UseTaskList } from './hooks/useTaskList.hook';

export function TaskList({}) {
  const { tasksByDay } = UseTaskList();

  function renderTasks(tasks) {
    return tasks.map((task) => (
      <div className='flex h-50px w-full items-center justify-between border-b-[1px] border-b-task-border-color pl-50px pr-20'>
        <span className='flex h-full w-fit items-center text-sm font-semibold text-snuff-font-color'>
          2000 - Criar a listagem de tarefas para home
        </span>
        <div className='flex h-full w-fit items-center'>
          <span className='mr-10 flex h-full w-fit items-center text-sm font-semibold text-timer-input-placeholder-font-color'>
            8:00 AM - 10:00 AM
          </span>
          <span className='flex h-full w-fit items-center text-sm font-semibold text-snuff-font-color'>
            2:00:00
          </span>
        </div>
      </div>
    ));
  }

  function renderDay(dayTasks: Array<GetPaginatedTaskTime>) {
    const { initiatedAt, totalTimeSpent } = dayTasks[0];
    const initiatedDate: Date = new Date(initiatedAt);
    const dayString: string = initiatedDate.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    });
    const formattedDayString: string = dayString.replaceAll('.', '');

    return (
      <div className=' mb-8 flex w-full flex-col items-start justify-start bg-background-light '>
        <div className='flex h-50px w-full items-center justify-between pl-50px pr-20'>
          <span className='flex h-full w-fit items-center text-sm font-semibold capitalize text-snuff-font-color'>
            {formattedDayString}
          </span>
          <span className='flex h-full w-fit items-center text-sm font-semibold text-snuff-font-color'>
            {totalTimeSpent}
          </span>
        </div>
        {renderTasks(dayTasks)}
      </div>
    );
  }

  function renderDays() {
    return tasksByDay.map((dayTasks) => renderDay(dayTasks));
  }

  return <div className='mt-16 flex w-full flex-col justify-start'>{renderDays()}</div>;
}
