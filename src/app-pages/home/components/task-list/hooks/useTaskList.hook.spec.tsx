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

  describe('getTotalTimeSpentFromDay tests', () => {
    it('Return total time spent from a day based on task times entries with one task', () => {
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
      const dayTask: Array<GetPaginatedTaskTime> = [taskTime];
      const { result } = renderHook(() => useTaskList());

      const totalTimeSpent = result.current.getTotalTimeSpentFromTimeEntries(dayTask);

      expect(totalTimeSpent).toBe('00:01:00');
    });

    it('Return total time spent from a day based on task times entries with three tasks', () => {
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
      const dayTask: Array<GetPaginatedTaskTime> = [taskTime, taskTime, taskTime];
      const { result } = renderHook(() => useTaskList());

      const totalTimeSpent = result.current.getTotalTimeSpentFromTimeEntries(dayTask);

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
    it('Group tasks by day with success', async () => {
      const endedAtTaskOne: string = '2025-01-16T10:00:00';
      const endedAtTaskTwo: string = '2025-01-15T10:00:00';
      const task: GetPaginatedTask = {
        description: '',
        id: 1,
        link: '',
        title: '',
      };
      const taskTimeOne: GetPaginatedTaskTime = {
        endedAt: endedAtTaskOne,
        id: 1,
        initiatedAt: '',
        task: task,
        totalTimeSpent: 60,
      };
      const taskTimeTwo: GetPaginatedTaskTime = {
        endedAt: endedAtTaskTwo,
        id: 1,
        initiatedAt: '',
        task: task,
        totalTimeSpent: 60,
      };

      const taskTimes: Array<GetPaginatedTaskTime> = [taskTimeOne, taskTimeTwo];

      jest.spyOn(services, 'getPaginatedTaskTimes').mockResolvedValue({
        taskTimes: taskTimes,
        isLastPage: true,
      });

      const { result } = renderHook(() => useTaskList());

      await waitFor(() => {
        const resultTasks: Array<Array<GetPaginatedTaskTime>> = result.current.tasksByDay;

        expect(resultTasks[0][0].endedAt).toBe(endedAtTaskOne);
        expect(resultTasks[1][0].endedAt).toBe(endedAtTaskTwo);
      });
    });
  });
});
