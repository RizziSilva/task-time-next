import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { GetPaginatedTaskTime, GetPaginatedTaskTimesRequest } from '@types';
import { getPaginatedTaskTimes } from '@services';
import { getErrorMessage } from '@utils';
import { GET_TASK_TIMES_ERROR_MESSAGE } from '../../../constants';

export function UseTaskList() {
  const [tasks, setTasks] = useState<Array<GetPaginatedTaskTime>>([]);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    async function getTasks() {
      try {
        const params: GetPaginatedTaskTimesRequest = { page };
        const data = await getPaginatedTaskTimes(params);
        debugger;
        setTasks([...tasks, ...data.taskTimes]);
        setIsLastPage(data.isLastPage);
        console.log('teste');
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

  return { tasks, isLastPage, handleLoadMoreClick };
}
