import { GetPaginatedTaskTime } from '@/types';
import { useTaskList } from './hooks/useTaskList.hook';
import { TEST_IDS } from '../../constants';

export function TaskList({}) {
  const {
    tasksByDay,
    getFormattedDayString,
    getStringTimeFromDateString,
    getTotalTimeSpentFromDay,
    getTotalTimeSpentFromTask,
    handleClickShowTaskEntries,
    getTotalTimeSpentFromTaskEntry,
    getIsOpenedTaskEntries,
  } = useTaskList();

  function renderTaskNumberOfEntries(numberOfEntries: number, taskId: number) {
    if (numberOfEntries <= 1) return null;

    const idOpenedTaskTimeEntries: boolean = getIsOpenedTaskEntries(taskId);

    return (
      <button
        onClick={() => handleClickShowTaskEntries(taskId)}
        className={`${idOpenedTaskTimeEntries ? 'bg-[#2c1937]' : ''} mr-[10px] flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border-[1px] border-[#7A5A87] hover:bg-[#2c1937]`}
      >
        <span className='text-sm text-white'>{numberOfEntries}</span>
      </button>
    );
  }

  function renderTaskTimeEntries(taskEntries: Array<GetPaginatedTaskTime>) {
    const taskId: number = taskEntries[0].task.id;
    const shouldRenderEntries: boolean = !!taskId && getIsOpenedTaskEntries(taskId);

    if (!shouldRenderEntries) return null;

    return taskEntries.map((taskTime) => {
      const { id, task, endedAt, initiatedAt, totalTimeSpent } = taskTime;
      const initiatedAtString: string = getStringTimeFromDateString(initiatedAt);
      const endedAtString: string = getStringTimeFromDateString(endedAt);
      const totalTimeSpentInTask: string = getTotalTimeSpentFromTaskEntry(totalTimeSpent);

      return (
        <div
          key={id}
          data-testid={TEST_IDS.TASK_LIST_TASK_TIME_CONTAINER}
          className='hover:bg-task-hover flex h-50px w-full items-center justify-between border-b-[1px] border-b-task-border-color bg-[#1c0f24] pl-[88px]  pr-20'
        >
          <div className='flex w-fit animate-task-entry items-center justify-start'>
            <span className='flex h-full w-fit items-center text-sm font-semibold text-snuff-font-color'>
              {task.title}
            </span>
          </div>
          <div className='flex h-full w-fit items-center'>
            <span className='mr-10 flex h-full w-fit items-center text-sm font-semibold text-timer-input-placeholder-font-color'>
              {initiatedAtString} - {endedAtString}
            </span>
            <span className='flex h-full w-fit items-center text-sm font-semibold text-snuff-font-color'>
              {totalTimeSpentInTask}
            </span>
          </div>
        </div>
      );
    });
  }

  function renderTasks(dayTasks: Array<Array<GetPaginatedTaskTime>>) {
    return dayTasks.map((tasks) => {
      const firstTimeEntry: GetPaginatedTaskTime = tasks[0];
      const lastTimeEntry: GetPaginatedTaskTime = tasks[tasks.length - 1];
      const { id, task } = firstTimeEntry;
      const initiatedAtString: string = getStringTimeFromDateString(lastTimeEntry.initiatedAt);
      const endedAtString: string = getStringTimeFromDateString(firstTimeEntry.endedAt);
      const totalTimeSpentInTask: string = getTotalTimeSpentFromTask(tasks);

      return (
        <>
          <div
            key={id}
            data-testid={TEST_IDS.TASK_LIST_TASK_TIME_CONTAINER}
            className='hover:bg-task-hover flex h-50px w-full items-center justify-between border-b-[1px] border-b-task-border-color pl-50px pr-20'
          >
            <div className='flex w-fit items-center justify-start'>
              {renderTaskNumberOfEntries(tasks.length, task.id)}
              <span className='flex h-full w-fit items-center text-sm font-semibold text-snuff-font-color'>
                {task.title}
              </span>
            </div>
            <div className='flex h-full w-fit items-center'>
              <span className='mr-10 flex h-full w-fit items-center text-sm font-semibold text-timer-input-placeholder-font-color'>
                {initiatedAtString} - {endedAtString}
              </span>
              <span className='flex h-full w-fit items-center text-sm font-semibold text-snuff-font-color'>
                {totalTimeSpentInTask}
              </span>
            </div>
          </div>
          {renderTaskTimeEntries(tasks)}
        </>
      );
    });
  }

  function renderDay(dayTasks: Array<Array<GetPaginatedTaskTime>>) {
    const { initiatedAt, id } = dayTasks[0][0];
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
    return tasksByDay.map((dayTasks: Array<Array<GetPaginatedTaskTime>>) => renderDay(dayTasks));
  }

  return (
    <div className='mt-16 flex w-full flex-col justify-start overflow-y-auto scrollbar scrollbar-thumb-scrollbar-color scrollbar-thumb-rounded-xl scrollbar-w-1'>
      {renderDays()}
    </div>
  );
}
