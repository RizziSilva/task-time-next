import { act, renderHook, waitFor } from '@testing-library/react';
import * as services from '@services';
import { GetPaginatedTask, GetPaginatedTaskTime } from '@types';
import { useTaskList } from './useTaskList.hook';

jest.mock('@services');

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

      const { result } = renderHook(() => useTaskList());
      const totalTimeSpentFromEntry = result.current.getTotalTimeSpentFromTaskEntry(
        taskTime.totalTimeSpent,
      );

      expect(totalTimeSpentFromEntry).toBe(`00:00:0${taskTime.totalTimeSpent}`);
    });

    it('Return total time spent from one entry with less than one minute from task', () => {
      const taskTime = getTaskTimeMock();

      taskTime.totalTimeSpent = 40;

      const { result } = renderHook(() => useTaskList());
      const totalTimeSpentFromEntry = result.current.getTotalTimeSpentFromTaskEntry(
        taskTime.totalTimeSpent,
      );

      expect(totalTimeSpentFromEntry).toBe(`00:00:${taskTime.totalTimeSpent}`);
    });

    it('Return total time spent from one entry with less than ten minutes should have zero on minutes from task', () => {
      const taskTime = getTaskTimeMock();

      taskTime.totalTimeSpent = 100;

      const { result } = renderHook(() => useTaskList());
      const totalTimeSpentFromEntry = result.current.getTotalTimeSpentFromTaskEntry(
        taskTime.totalTimeSpent,
      );

      expect(totalTimeSpentFromEntry).toBe('00:01:40');
    });

    it('Return total time spent from one entry with less than one hour from task', () => {
      const taskTime = getTaskTimeMock();

      taskTime.totalTimeSpent = 601;

      const { result } = renderHook(() => useTaskList());
      const totalTimeSpentFromEntry = result.current.getTotalTimeSpentFromTaskEntry(
        taskTime.totalTimeSpent,
      );

      expect(totalTimeSpentFromEntry).toBe('00:10:01');
    });

    it('Return total time spent from one entry with less than ten hours should have zero on hours from task', () => {
      const taskTime = getTaskTimeMock();

      taskTime.totalTimeSpent = 3600;

      const { result } = renderHook(() => useTaskList());
      const totalTimeSpentFromEntry = result.current.getTotalTimeSpentFromTaskEntry(
        taskTime.totalTimeSpent,
      );

      expect(totalTimeSpentFromEntry).toBe('01:00:00');
    });

    it('Return total time spent from one entry with hour, minutes and seconds', () => {
      const taskTime = getTaskTimeMock();

      taskTime.totalTimeSpent = 3661;

      const { result } = renderHook(() => useTaskList());
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
      const { result } = renderHook(() => useTaskList());
      const totalTimeSpentFromEntry = result.current.getTotalTimeSpentFromTask(taskByDay);

      expect(totalTimeSpentFromEntry).toBe('00:01:00');
    });

    it('Return total time spent from a day with two tasks and total time with minutes', () => {
      const taskTime = getTaskTimeMock();

      taskTime.totalTimeSpent = 300;

      const taskByDay = [taskTime, taskTime];
      const { result } = renderHook(() => useTaskList());
      const totalTimeSpentFromEntry = result.current.getTotalTimeSpentFromTask(taskByDay);

      expect(totalTimeSpentFromEntry).toBe('00:10:00');
    });

    it('Return total time spent from a day with three tasks and total time with hours, minutes and seconds', () => {
      const taskTime = getTaskTimeMock();

      taskTime.totalTimeSpent = 1221;

      const taskByDay = [taskTime, taskTime, taskTime];
      const { result } = renderHook(() => useTaskList());
      const totalTimeSpentFromEntry = result.current.getTotalTimeSpentFromTask(taskByDay);

      expect(totalTimeSpentFromEntry).toBe('01:01:03');
    });
  });

  describe('getTotalTimeSpentFromDay tests', () => {
    it('Return total time spent from a day based on task times entries with one day', () => {
      const taskTime = getTaskTimeMock();

      taskTime.totalTimeSpent = 60;

      const dayTask: Array<Array<GetPaginatedTaskTime>> = [[taskTime]];
      const { result } = renderHook(() => useTaskList());

      const totalTimeSpent = result.current.getTotalTimeSpentFromDay(dayTask);

      expect(totalTimeSpent).toBe('00:01:00');
    });

    it('Return total time spent from a day based on task times entries with two days', () => {
      const taskTime = getTaskTimeMock();

      taskTime.totalTimeSpent = 60;

      const dayTask: Array<Array<GetPaginatedTaskTime>> = [[taskTime, taskTime], [taskTime]];
      const { result } = renderHook(() => useTaskList());

      const totalTimeSpent = result.current.getTotalTimeSpentFromDay(dayTask);

      expect(totalTimeSpent).toBe('00:03:00');
    });
  });

  describe('getStringTimeFromDateString tests', () => {
    it('Return hours and minutes from a string date', () => {
      jest.useFakeTimers().setSystemTime(new Date('2025-01-16T10:10:00'));

      const date: Date = new Date();
      const mockDate: string = date.toUTCString();
      const { result } = renderHook(() => useTaskList());

      const stringResult = result.current.getStringTimeFromDateString(mockDate);
      const expected: string = `${date.getHours()}:${date.getMinutes()}`;

      expect(stringResult).toMatch(expected);
    });

    it('Return hours and minutes with a leading zero if less than 10 from a string date', () => {
      jest.useFakeTimers().setSystemTime(new Date('2025-01-16T08:02:00'));

      const date: Date = new Date();
      const mockDate: string = date.toUTCString();
      const { result } = renderHook(() => useTaskList());

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
      const { result } = renderHook(() => useTaskList());

      const stringResult = result.current.getFormattedDayString(mockDate);

      expect(stringResult).toBe('qui, 16 de jan');
    });
  });

  describe('getIsOpenedTaskEntries tests', () => {
    it('Return that a task is opened', async () => {
      const { result } = renderHook(() => useTaskList());
      const taskId: number = 1;

      await waitFor(() => {
        result.current.handleClickShowTaskEntries(taskId);

        const isOpened: boolean = result.current.getIsOpenedTaskEntries(taskId);

        expect(isOpened).toBe(true);
      });
    });

    it('Return that a task is closed', () => {
      const { result } = renderHook(() => useTaskList());
      const taskId: number = 1;
      const isOpened: boolean = result.current.getIsOpenedTaskEntries(taskId);

      expect(isOpened).toBe(false);
    });

    it('Return that a task is closed after it been opened', async () => {
      const { result } = renderHook(() => useTaskList());
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
      const { result } = renderHook(() => useTaskList());
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

      const { result } = renderHook(() => useTaskList());

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

      const { result } = renderHook(() => useTaskList());

      await waitFor(() => {
        const resultTasks: Array<Array<Array<GetPaginatedTaskTime>>> = result.current.tasksByDay;

        expect(resultTasks[0][0][0].id).toBe(taskTime.id);
        expect(resultTasks[0][1][0].id).toBe(taskTimeTwo.id);
      });
    });
  });

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
