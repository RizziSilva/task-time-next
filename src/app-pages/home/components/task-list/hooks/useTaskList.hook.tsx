import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { GetPaginatedTaskTime, GetPaginatedTaskTimesRequest, Times } from '@types';
import { getPaginatedTaskTimes } from '@services';
import { getErrorMessage, getFormmatedTimesFromSeconds } from '@utils';
import { GET_TASK_TIMES_ERROR_MESSAGE } from '../../../constants';

export function UseTaskList() {
  const [tasksByDay, setTasksByDay] = useState<Array<Array<GetPaginatedTaskTime>>>([]);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    function groupTaskByDay(taskTimes: Array<GetPaginatedTaskTime>) {
      const groupedTaskTimes = taskTimes.reduce(
        (acc: Record<string, Array<GetPaginatedTaskTime>>, taskTime) => {
          const datetime: Date = new Date(taskTime.endedAt);
          const dateAsString: string = datetime.toLocaleDateString();
          const alreadyHasKey: boolean = !!acc[dateAsString];

          if (!alreadyHasKey) acc[dateAsString] = [];

          acc[dateAsString].push(taskTime);

          return acc;
        },
        {},
      );
      const groupedAsArray: Array<Array<GetPaginatedTaskTime>> = Object.values(groupedTaskTimes);

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
    const hours = `${date.getHours().toString().padStart(2, '0')}`;
    const minutes = `${date.getMinutes().toString().padStart(2, '0')}`;

    return `${hours}:${minutes}`;
  }

  function getTotalTimeSpentFromDay(dayTaskTimes: Array<GetPaginatedTaskTime>): string {
    const totalTimeSpentInSeconds: number = dayTaskTimes.reduce(
      (acc: number, taskTime: GetPaginatedTaskTime) => acc + taskTime.totalTimeSpent,
      0,
    );
    const totalTimeSpentInValues: Times = getFormmatedTimesFromSeconds(totalTimeSpentInSeconds);

    return `${totalTimeSpentInValues.hours}:${totalTimeSpentInValues.minutes}:${totalTimeSpentInValues.seconds}`;
  }

  return {
    tasksByDay,
    isLastPage,
    handleLoadMoreClick,
    getFormattedDayString,
    getStringTimeFromDateString,
    getTotalTimeSpentFromDay,
  };
}
