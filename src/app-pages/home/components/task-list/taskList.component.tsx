import { GetPaginatedTaskTime } from '@/types';
import { UseTaskList } from './hooks/useTaskList.hook';

export function TaskList({}) {
  const {
    tasksByDay,
    getFormattedDayString,
    getStringTimeFromDateString,
    getTotalTimeSpentFromDay,
  } = UseTaskList();

  function renderTasks(dayTasks: Array<GetPaginatedTaskTime>) {
    return dayTasks.map(({ id, task, initiatedAt, endedAt }) => {
      const initiatedAtString: string = getStringTimeFromDateString(initiatedAt);
      const endedAtString: string = getStringTimeFromDateString(endedAt);

      return (
        <div
          key={id}
          className='flex h-50px w-full items-center justify-between border-b-[1px] border-b-task-border-color pl-50px pr-20'
        >
          <span className='flex h-full w-fit items-center text-sm font-semibold text-snuff-font-color'>
            {task.title}
          </span>
          <div className='flex h-full w-fit items-center'>
            <span className='mr-10 flex h-full w-fit items-center text-sm font-semibold text-timer-input-placeholder-font-color'>
              {initiatedAtString} - {endedAtString}
            </span>
            <span className='flex h-full w-fit items-center text-sm font-semibold text-snuff-font-color'>
              2:00:00
            </span>
          </div>
        </div>
      );
    });
  }

  function renderDay(dayTasks: Array<GetPaginatedTaskTime>) {
    const { initiatedAt, id } = dayTasks[0];
    const day: string = getFormattedDayString(initiatedAt);
    const formattedTotalTimeSpent: string = getTotalTimeSpentFromDay(dayTasks);

    return (
      <div
        key={id}
        className=' mb-8 flex w-full flex-col items-start justify-start bg-background-light '
      >
        <div className='flex h-50px w-full items-center justify-between pl-50px pr-20'>
          <span className='flex h-full w-fit items-center text-sm font-semibold capitalize text-snuff-font-color'>
            {day}
          </span>
          <span className='flex h-full w-fit items-center text-sm font-semibold text-snuff-font-color'>
            {formattedTotalTimeSpent}
          </span>
        </div>
        {renderTasks(dayTasks)}
      </div>
    );
  }

  function renderDays() {
    return tasksByDay.map((dayTasks) => renderDay(dayTasks));
  }

  return (
    <div className='scrollbar scrollbar-w-1 scrollbar-thumb-rounded-xl scrollbar-thumb-scrollbar-color mt-16 flex w-full flex-col justify-start overflow-y-auto'>
      {renderDays()}
    </div>
  );
}
