import { act, renderHook } from '@testing-library/react';
import { useTaskList } from './useTaskList.hook';
import { GetPaginatedTask, GetPaginatedTaskTime } from '@/types';

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

      const totalTimeSpent = result.current.getTotalTimeSpentFromDay(dayTask);

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
});
