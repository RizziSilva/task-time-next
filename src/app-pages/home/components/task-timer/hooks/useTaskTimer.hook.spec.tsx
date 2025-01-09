import { act, renderHook } from '@testing-library/react';
import { useTaskTimer } from './useTaskTimer.hook';
import { Task } from '@/types';
import { INITIAL_TASK_STATE } from '@/app-pages/home/constants';

describe('useTaskTimer tests', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('onTimerStart tests', () => {
    it('Set current date when task is started', () => {
      const { result } = renderHook(() => useTaskTimer());

      act(() => {
        result.current.onTimerStart();
      });

      const actual: Date | undefined = result.current.task.initiatedAt;
      const expected: Date = new Date();

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('resetTask tests', () => {
    it('Reset task to its initial value', () => {
      const { result } = renderHook(() => useTaskTimer());

      act(() => {
        result.current.resetTask();
      });

      const actual: Task = result.current.task;
      const expected: Task = INITIAL_TASK_STATE;

      expect(actual).toStrictEqual(expected);
    });
  });
});
