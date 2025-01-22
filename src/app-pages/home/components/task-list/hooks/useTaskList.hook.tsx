import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { GetPaginatedTaskTime, GetPaginatedTaskTimesRequest, TaskTime, Times } from '@types';
import { getPaginatedTaskTimes } from '@services';
import { getErrorMessage, getFormmatedTimesFromSeconds } from '@utils';
import { GET_TASK_TIMES_ERROR_MESSAGE } from '../../../constants';

export function useTaskList() {
  const [tasksByDay, setTasksByDay] = useState<Array<Array<Array<GetPaginatedTaskTime>>>>([]);
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [taskToShowTimes, setTaskToShowTimes] = useState<Array<number>>([]);

  useEffect(() => {
    function groupTaskByDay(taskTimes: Array<GetPaginatedTaskTime>) {
      const groupedTaskTimes = taskTimes.reduce(
        (acc: Record<string, Array<Array<GetPaginatedTaskTime>>>, taskTime) => {
          const datetime: Date = new Date(taskTime.endedAt);
          const dateAsString: string = datetime.toLocaleDateString();
          const alreadyHasDayKey: boolean = !!acc[dateAsString];

          if (!alreadyHasDayKey) acc[dateAsString] = [];

          const taskEntries = acc[dateAsString].find((tasks) =>
            tasks.some(({ task }) => task.id === taskTime.task.id),
          );

          if (!taskEntries) acc[dateAsString].push([taskTime]);
          else taskEntries.push(taskTime);

          return acc;
        },
        {},
      );

      const groupedAsArray: Array<Array<Array<GetPaginatedTaskTime>>> =
        Object.values(groupedTaskTimes);

      setTasksByDay(groupedAsArray);
    }

    async function getTasks() {
      try {
        const params: GetPaginatedTaskTimesRequest = { page };
        const data = await getPaginatedTaskTimes(params);

        groupTaskByDay(data.taskTimes);
        setIsLastPage(data.isLastPage);
      } catch (error) {
        console.error(error);

        const errorMessage: string = getErrorMessage(error, GET_TASK_TIMES_ERROR_MESSAGE);

        toast.error(errorMessage);
      }
    }

    getTasks();
  }, [page]);

  function handleLoadMoreClick() {
    setPage(page + 1);
  }

  function handleClickShowTaskEntries(taskId: number) {
    console.log('teste click');
    const currentOpenedTasks: Array<number> = [...taskToShowTimes];
    const indexOfClickedTask: number = currentOpenedTasks.indexOf(taskId);
    const isTaskAlreadyOpened: boolean = indexOfClickedTask !== -1;

    if (isTaskAlreadyOpened) currentOpenedTasks.splice(indexOfClickedTask, 1);
    else currentOpenedTasks.push(taskId);

    setTaskToShowTimes(currentOpenedTasks);
  }

  function getIsOpenedTaskEntries(taskId: number): boolean {
    return taskToShowTimes.includes(taskId);
  }

  function getFormattedDayString(day: string): string {
    const date: Date = new Date(day);
    const dayString: string = date.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    });
    const formattedDayString: string = dayString.replaceAll('.', '');

    return formattedDayString;
  }

  function getStringTimeFromDateString(stringDate: string): string {
    const date: Date = new Date(stringDate);
    const hours: string = `${date.getHours().toString().padStart(2, '0')}`;
    const minutes: string = `${date.getMinutes().toString().padStart(2, '0')}`;

    return `${hours}:${minutes}`;
  }

  function getTotalTimeSpentFromDay(dayTaskTimes: Array<Array<GetPaginatedTaskTime>>): string {
    const totalTimeSpentInSeconds: number = dayTaskTimes.reduce(
      (dayAcc: number, taskTimes: Array<GetPaginatedTaskTime>) => {
        return taskTimes.reduce(
          (taskAcc: number, taskTime: GetPaginatedTaskTime) => taskAcc + taskTime.totalTimeSpent,
          dayAcc,
        );
      },
      0,
    );
    const totalTimeSpentInValues: Times = getFormmatedTimesFromSeconds(totalTimeSpentInSeconds);

    return `${totalTimeSpentInValues.hours}:${totalTimeSpentInValues.minutes}:${totalTimeSpentInValues.seconds}`;
  }

  function getTotalTimeSpentFromTask(taskTaskTimes: Array<GetPaginatedTaskTime>): string {
    const totalTimeSpentInSeconds: number = taskTaskTimes.reduce(
      (acc: number, taskTime: GetPaginatedTaskTime) => acc + taskTime.totalTimeSpent,
      0,
    );
    const totalTimeSpentInValues: Times = getFormmatedTimesFromSeconds(totalTimeSpentInSeconds);

    return `${totalTimeSpentInValues.hours}:${totalTimeSpentInValues.minutes}:${totalTimeSpentInValues.seconds}`;
  }

  function getTotalTimeSpentFromTaskEntry(totalSpent: number): string {
    const totalTimeSpentInValues: Times = getFormmatedTimesFromSeconds(totalSpent);

    return `${totalTimeSpentInValues.hours}:${totalTimeSpentInValues.minutes}:${totalTimeSpentInValues.seconds}`;
  }

  return {
    tasksByDay,
    isLastPage,
    page,
    handleLoadMoreClick,
    getFormattedDayString,
    getStringTimeFromDateString,
    getTotalTimeSpentFromDay,
    getTotalTimeSpentFromTask,
    handleClickShowTaskEntries,
    getTotalTimeSpentFromTaskEntry,
    getIsOpenedTaskEntries,
  };
}
