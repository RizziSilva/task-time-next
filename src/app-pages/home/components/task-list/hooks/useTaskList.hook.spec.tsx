import { act, renderHook, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import * as services from '@services';
import {
  CreateTaskResponse,
  CreateTaskTimeResponse,
  GetPaginatedTask,
  GetPaginatedTaskTime,
  TaskTime,
} from '@types';
import { useTaskList } from './useTaskList.hook';
import {
  CREATE_TASK_TIME_UPDATE_LIST_ERROR_MESSAGE,
  GET_TASK_TIMES_ERROR_MESSAGE,
} from '@/app-pages/home/constants';

jest.mock('@services');

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  },
}));

describe('useTaskList hook tests', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('getTotalTimeSpentFromTaskEntry tests', () => {
    it('Return total time spent from one entry with less than ten seconds should have zero on seconds from task', () => {
      const taskTime = getTaskTimeMock();

      taskTime.totalTimeSpent = 9;

      const { result } = renderHook(() => useTaskList({ newTask: null, newTaskTime: null }));
      const totalTimeSpentFromEntry = result.current.getTotalTimeSpentFromTaskEntry(
        taskTime.totalTimeSpent,
      );

      expect(totalTimeSpentFromEntry).toBe(`00:00:0${taskTime.totalTimeSpent}`);
    });

    it('Return total time spent from one entry with less than one minute from task', () => {
      const taskTime = getTaskTimeMock();

      taskTime.totalTimeSpent = 40;

      const { result } = renderHook(() => useTaskList({ newTask: null, newTaskTime: null }));
      const totalTimeSpentFromEntry = result.current.getTotalTimeSpentFromTaskEntry(
        taskTime.totalTimeSpent,
      );

      expect(totalTimeSpentFromEntry).toBe(`00:00:${taskTime.totalTimeSpent}`);
    });

    it('Return total time spent from one entry with less than ten minutes should have zero on minutes from task', () => {
      const taskTime = getTaskTimeMock();

      taskTime.totalTimeSpent = 100;

      const { result } = renderHook(() => useTaskList({ newTask: null, newTaskTime: null }));
      const totalTimeSpentFromEntry = result.current.getTotalTimeSpentFromTaskEntry(
        taskTime.totalTimeSpent,
      );

      expect(totalTimeSpentFromEntry).toBe('00:01:40');
    });

    it('Return total time spent from one entry with less than one hour from task', () => {
      const taskTime = getTaskTimeMock();

      taskTime.totalTimeSpent = 601;

      const { result } = renderHook(() => useTaskList({ newTask: null, newTaskTime: null }));
      const totalTimeSpentFromEntry = result.current.getTotalTimeSpentFromTaskEntry(
        taskTime.totalTimeSpent,
      );

      expect(totalTimeSpentFromEntry).toBe('00:10:01');
    });

    it('Return total time spent from one entry with less than ten hours should have zero on hours from task', () => {
      const taskTime = getTaskTimeMock();

      taskTime.totalTimeSpent = 3600;

      const { result } = renderHook(() => useTaskList({ newTask: null, newTaskTime: null }));
      const totalTimeSpentFromEntry = result.current.getTotalTimeSpentFromTaskEntry(
        taskTime.totalTimeSpent,
      );

      expect(totalTimeSpentFromEntry).toBe('01:00:00');
    });

    it('Return total time spent from one entry with hour, minutes and seconds', () => {
      const taskTime = getTaskTimeMock();

      taskTime.totalTimeSpent = 3661;

      const { result } = renderHook(() => useTaskList({ newTask: null, newTaskTime: null }));
      const totalTimeSpentFromEntry = result.current.getTotalTimeSpentFromTaskEntry(
        taskTime.totalTimeSpent,
      );

      expect(totalTimeSpentFromEntry).toBe('01:01:01');
    });
  });

  describe('getTotalTimeSpentFromTask tests', () => {
    it('Return total time spent from a day with one task', () => {
      const taskTime = getTaskTimeMock();

      taskTime.totalTimeSpent = 60;

      const taskByDay = [taskTime];
      const { result } = renderHook(() => useTaskList({ newTask: null, newTaskTime: null }));
      const totalTimeSpentFromEntry = result.current.getTotalTimeSpentFromTask(taskByDay);

      expect(totalTimeSpentFromEntry).toBe('00:01:00');
    });

    it('Return total time spent from a day with two tasks and total time with minutes', () => {
      const taskTime = getTaskTimeMock();

      taskTime.totalTimeSpent = 300;

      const taskByDay = [taskTime, taskTime];
      const { result } = renderHook(() => useTaskList({ newTask: null, newTaskTime: null }));
      const totalTimeSpentFromEntry = result.current.getTotalTimeSpentFromTask(taskByDay);

      expect(totalTimeSpentFromEntry).toBe('00:10:00');
    });

    it('Return total time spent from a day with three tasks and total time with hours, minutes and seconds', () => {
      const taskTime = getTaskTimeMock();

      taskTime.totalTimeSpent = 1221;

      const taskByDay = [taskTime, taskTime, taskTime];
      const { result } = renderHook(() => useTaskList({ newTask: null, newTaskTime: null }));
      const totalTimeSpentFromEntry = result.current.getTotalTimeSpentFromTask(taskByDay);

      expect(totalTimeSpentFromEntry).toBe('01:01:03');
    });
  });

  describe('getTotalTimeSpentFromDay tests', () => {
    it('Return total time spent from a day based on task times entries with one day', () => {
      const taskTime = getTaskTimeMock();

      taskTime.totalTimeSpent = 60;

      const dayTask: Array<Array<GetPaginatedTaskTime>> = [[taskTime]];
      const { result } = renderHook(() => useTaskList({ newTask: null, newTaskTime: null }));

      const totalTimeSpent = result.current.getTotalTimeSpentFromDay(dayTask);

      expect(totalTimeSpent).toBe('00:01:00');
    });

    it('Return total time spent from a day based on task times entries with two days', () => {
      const taskTime = getTaskTimeMock();

      taskTime.totalTimeSpent = 60;

      const dayTask: Array<Array<GetPaginatedTaskTime>> = [[taskTime, taskTime], [taskTime]];
      const { result } = renderHook(() => useTaskList({ newTask: null, newTaskTime: null }));

      const totalTimeSpent = result.current.getTotalTimeSpentFromDay(dayTask);

      expect(totalTimeSpent).toBe('00:03:00');
    });
  });

  describe('getStringTimeFromDateString tests', () => {
    it('Return hours and minutes from a string date', () => {
      jest.useFakeTimers().setSystemTime(new Date('2025-01-16T10:10:00'));

      const date: Date = new Date();
      const mockDate: string = date.toUTCString();
      const { result } = renderHook(() => useTaskList({ newTask: null, newTaskTime: null }));

      const stringResult = result.current.getStringTimeFromDateString(mockDate);
      const expected: string = `${date.getHours()}:${date.getMinutes()}`;

      expect(stringResult).toMatch(expected);
    });

    it('Return hours and minutes with a leading zero if less than 10 from a string date', () => {
      jest.useFakeTimers().setSystemTime(new Date('2025-01-16T08:02:00'));

      const date: Date = new Date();
      const mockDate: string = date.toUTCString();
      const { result } = renderHook(() => useTaskList({ newTask: null, newTaskTime: null }));

      const stringResult = result.current.getStringTimeFromDateString(mockDate);
      const expected: string = `0${date.getHours()}:0${date.getMinutes()}`;

      expect(stringResult).toMatch(expected);
    });
  });

  describe('getFormattedDayString tests', () => {
    it('Return day date formatted', () => {
      jest.useFakeTimers().setSystemTime(new Date('2025-01-16T10:00:00'));
      const date: Date = new Date();
      const mockDate: string = date.toUTCString();
      const { result } = renderHook(() => useTaskList({ newTask: null, newTaskTime: null }));

      const stringResult = result.current.getFormattedDayString(mockDate);

      expect(stringResult).toBe('qui, 16 de jan');
    });
  });

  describe('getIsOpenedTaskEntries tests', () => {
    it('Return that a task is opened', async () => {
      const { result } = renderHook(() => useTaskList({ newTask: null, newTaskTime: null }));
      const taskId: number = 1;

      await waitFor(() => {
        result.current.handleClickShowTaskEntries(taskId);

        const isOpened: boolean = result.current.getIsOpenedTaskEntries(taskId);

        expect(isOpened).toBe(true);
      });
    });

    it('Return that a task is closed', () => {
      const { result } = renderHook(() => useTaskList({ newTask: null, newTaskTime: null }));
      const taskId: number = 1;
      const isOpened: boolean = result.current.getIsOpenedTaskEntries(taskId);

      expect(isOpened).toBe(false);
    });

    it('Return that a task is closed after it been opened', async () => {
      const { result } = renderHook(() => useTaskList({ newTask: null, newTaskTime: null }));
      const taskId: number = 1;
      let isOpened: boolean = result.current.getIsOpenedTaskEntries(taskId);

      expect(isOpened).toBe(false);

      await waitFor(() => {
        result.current.handleClickShowTaskEntries(taskId);

        isOpened = result.current.getIsOpenedTaskEntries(taskId);

        expect(isOpened).toBe(true);
      });

      await waitFor(() => {
        result.current.handleClickShowTaskEntries(taskId);

        isOpened = result.current.getIsOpenedTaskEntries(taskId);

        expect(isOpened).toBe(false);
      });
    });
  });

  describe('handleLoadMoreClick tests', () => {
    it('Change page when clicked', () => {
      const { result } = renderHook(() => useTaskList({ newTask: null, newTaskTime: null }));
      const initialPage: number = result.current.page;

      expect(initialPage).toBe(1);

      act(() => {
        result.current.handleLoadMoreClick();
      });

      expect(result.current.page).toBe(2);
    });
  });

  describe('useEffect tests', () => {
    it('Group tasks by day with two tasks in tow days with success', async () => {
      const endedAtTaskOne: string = '2025-01-16T10:00:00';
      const endedAtTaskTwo: string = '2025-01-15T10:00:00';
      const taskTime = getTaskTimeMock();

      taskTime.endedAt = endedAtTaskOne;

      const taskTimeTwo = getTaskTimeMock();

      taskTimeTwo.endedAt = endedAtTaskTwo;
      taskTimeTwo.id = 2;

      const taskTimes: Array<GetPaginatedTaskTime> = [taskTime, taskTimeTwo];

      jest.spyOn(services, 'getPaginatedTaskTimes').mockResolvedValue({
        taskTimes: taskTimes,
        isLastPage: true,
      });

      const { result } = renderHook(() => useTaskList({ newTask: null, newTaskTime: null }));

      await waitFor(() => {
        const resultTasks: Array<Array<Array<GetPaginatedTaskTime>>> = result.current.tasksByDay;

        expect(resultTasks[0][0][0].id).toBe(taskTime.id);
        expect(resultTasks[1][0][0].id).toBe(taskTimeTwo.id);
      });
    });

    it('Group tasks by day and by task with one day and two tasks with success', async () => {
      const endedAtTaskOne: string = '2025-01-16T11:00:00';
      const endedAtTaskTwo: string = '2025-01-16T10:00:00';
      const taskTime = getTaskTimeMock();

      taskTime.endedAt = endedAtTaskOne;

      const taskTimeTwo = getTaskTimeMock();

      taskTimeTwo.endedAt = endedAtTaskTwo;
      taskTimeTwo.task.id = 2;
      taskTime.id = 2;

      const taskTimes: Array<GetPaginatedTaskTime> = [taskTime, taskTimeTwo];

      jest.spyOn(services, 'getPaginatedTaskTimes').mockResolvedValue({
        taskTimes: taskTimes,
        isLastPage: true,
      });

      const { result } = renderHook(() => useTaskList({ newTask: null, newTaskTime: null }));

      await waitFor(() => {
        const resultTasks: Array<Array<Array<GetPaginatedTaskTime>>> = result.current.tasksByDay;

        expect(resultTasks[0][0][0].id).toBe(taskTime.id);
        expect(resultTasks[0][1][0].id).toBe(taskTimeTwo.id);
      });
    });

    it('It show default error message when request fails', async () => {
      jest.spyOn(services, 'getPaginatedTaskTimes').mockRejectedValue(new Error());

      renderHook(() => useTaskList({ newTask: null, newTaskTime: null }));

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(GET_TASK_TIMES_ERROR_MESSAGE);
      });
    });

    it('It show error message when request fails', async () => {
      const errorMessage: string = 'Some error message';

      jest.spyOn(services, 'getPaginatedTaskTimes').mockRejectedValue(new Error(errorMessage));

      renderHook(() => useTaskList({ newTask: null, newTaskTime: null }));

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(errorMessage);
      });
    });
  });

  describe('updateListWithNewTask tests', () => {
    it('Update list with new created task on list first place', async () => {
      const tomorrow: Date = new Date();
      const today: Date = new Date();

      tomorrow.setDate(tomorrow.getDate() + 1);

      const endedAtTaskOne: string = today.toISOString();
      const taskTime = getTaskTimeMock();
      const taskTimes: Array<GetPaginatedTaskTime> = [taskTime];
      const newTask: CreateTaskResponse = getCreatedTaskMock();

      taskTime.endedAt = endedAtTaskOne;
      newTask.times[0].endedAt = tomorrow.toISOString();

      jest.spyOn(services, 'getPaginatedTaskTimes').mockResolvedValue({
        taskTimes: taskTimes,
        isLastPage: true,
      });

      const { result, rerender } = renderHook(
        ({ newTask, newTaskTime }) => useTaskList({ newTask, newTaskTime }),
        { initialProps: { newTask: null, newTaskTime: null } },
      );

      await waitFor(() => {
        expect(result.current.tasksByDay[0][0][0].id).toBe(taskTime.id);
      });

      rerender({ newTask });

      await waitFor(() => {
        expect(result.current.tasksByDay[0][0][0].id).toBe(newTask.times[0].id);
      });
    });

    it('Update list with new created task when list is empty', async () => {
      const tomorrow: Date = new Date();

      tomorrow.setDate(tomorrow.getDate() + 1);

      const taskTimes: Array<GetPaginatedTaskTime> = [];
      const newTask: CreateTaskResponse = getCreatedTaskMock();

      newTask.times[0].endedAt = tomorrow.toISOString();

      jest.spyOn(services, 'getPaginatedTaskTimes').mockResolvedValue({
        taskTimes: taskTimes,
        isLastPage: true,
      });

      const { result, rerender } = renderHook(
        ({ newTask, newTaskTime }) => useTaskList({ newTask, newTaskTime }),
        { initialProps: { newTask: null, newTaskTime: null } },
      );

      await waitFor(() => {
        expect(result.current.tasksByDay.length).toBe(0);
      });

      rerender({ newTask });

      await waitFor(() => {
        expect(result.current.tasksByDay.length).toBe(1);
        expect(result.current.tasksByDay[0][0][0].id).toBe(newTask.times[0].id);
      });
    });
  });

  describe('updateWithNewTaskTime tests', () => {
    it('Update list with new task time entry', async () => {
      const taskTime: GetPaginatedTaskTime = getTaskTimeMock();
      const taskTimes: Array<GetPaginatedTaskTime> = [taskTime];
      const newTaskTime: CreateTaskTimeResponse = getCreatedTaskTimeMock();

      newTaskTime.taskId = taskTime.task.id;

      jest.spyOn(services, 'getPaginatedTaskTimes').mockResolvedValue({
        taskTimes: taskTimes,
        isLastPage: true,
      });

      const { result, rerender } = renderHook(
        ({ newTask, newTaskTime }) => useTaskList({ newTask, newTaskTime }),
        { initialProps: { newTask: null, newTaskTime: null } },
      );

      await waitFor(() => {
        expect(result.current.tasksByDay[0][0][0].id).toBe(taskTime.id);
      });

      rerender({ newTaskTime });

      await waitFor(() => {
        expect(result.current.tasksByDay[0][0][0].id).toBe(newTaskTime.id);
      });
    });

    it('Try too update list with new task time entry without correct task id throws error', async () => {
      const taskTime: GetPaginatedTaskTime = getTaskTimeMock();
      const taskTimes: Array<GetPaginatedTaskTime> = [taskTime];
      const newTaskTime: CreateTaskTimeResponse = getCreatedTaskTimeMock();

      newTaskTime.taskId = 999;

      jest.spyOn(services, 'getPaginatedTaskTimes').mockResolvedValue({
        taskTimes: taskTimes,
        isLastPage: true,
      });

      const { result, rerender } = renderHook(
        ({ newTask, newTaskTime }) => useTaskList({ newTask, newTaskTime }),
        { initialProps: { newTask: null, newTaskTime: null } },
      );

      await waitFor(() => {
        expect(result.current.tasksByDay[0][0][0].id).toBe(taskTime.id);
      });

      rerender({ newTaskTime });

      await waitFor(() => {
        expect(result.current.tasksByDay[0][0].length).toBe(1);
        expect(toast.error).toHaveBeenCalledWith(CREATE_TASK_TIME_UPDATE_LIST_ERROR_MESSAGE);
      });
    });
  });

  function getCreatedTaskTimeMock() {
    const taskTime: CreateTaskTimeResponse = {
      createdAt: '',
      endedAt: '',
      id: 2,
      initiatedAt: '',
      taskId: 1,
      timeSpent: 100,
      updatedAt: '',
    };

    return taskTime;
  }

  function getCreatedTaskMock() {
    const today: Date = new Date();
    const taskTime: TaskTime = {
      createdAt: '',
      endedAt: today.toISOString(),
      id: 10,
      initiatedAt: '',
      timeSpent: 100,
      updatedAt: '',
    };
    const createdTask: CreateTaskResponse = {
      createdAt: today.toISOString(),
      id: 10,
      description: '',
      link: '',
      times: [taskTime],
      title: '',
      totalTimeSpent: 100,
      updatedAt: '',
    };

    return createdTask;
  }

  function getTaskTimeMock() {
    const task: GetPaginatedTask = {
      description: '',
      id: 1,
      link: '',
      title: '',
    };
    const taskTime: GetPaginatedTaskTime = {
      endedAt: '',
      id: 1,
      initiatedAt: '',
      task: task,
      totalTimeSpent: 60,
    };

    return taskTime;
  }
});
