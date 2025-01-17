import { GetPaginatedTaskTime } from '@/types';
import { useTaskList } from './hooks/useTaskList.hook';
import { TEST_IDS } from '../../constants';

export function TaskList({}) {
  const {
    tasksByDay,
    getFormattedDayString,
    getStringTimeFromDateString,
    getTotalTimeSpentFromDay,
  } = useTaskList();

  function renderTasks(dayTasks: Array<GetPaginatedTaskTime>) {
    return dayTasks.map(({ id, task, initiatedAt, endedAt }) => {
      const initiatedAtString: string = getStringTimeFromDateString(initiatedAt);
      const endedAtString: string = getStringTimeFromDateString(endedAt);

      return (
        <div
          key={id}
          data-testid={TEST_IDS.TASK_LIST_TASK_TIME_CONTAINER}
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
        data-testid={TEST_IDS.TASK_LIST_DAY_CONTAINER}
        className='mb-8 flex w-full flex-col items-start justify-start bg-background-light '
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
    return tasksByDay.map((dayTasks: Array<GetPaginatedTaskTime>) => renderDay(dayTasks));
  }

  return (
    <div className='mt-16 flex w-full flex-col justify-start overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color scrollbar-thumb-rounded-xl scrollbar-w-1'>
      {renderDays()}
    </div>
  );
}
