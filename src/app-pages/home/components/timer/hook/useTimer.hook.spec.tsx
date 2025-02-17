import { renderHook, act, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';
import { CreateTaskResponse, Task, TaskTime, Times } from '@types';
import * as utils from '@utils';
import * as services from '@services';
import { CREATE_TASK_TIME_ERROR_MESSAGE } from '../../../constants';
import { useTimer } from './useTimer.hook';

jest.mock('@utils');

jest.mock('@services');

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  },
}));

describe('useTimer hook tests', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('getTimerToShow tests', () => {
    it('Retuns timer as string', async () => {
      const task: Task = {
        description: '',
        endedAt: undefined,
        initiatedAt: undefined,
        link: '',
        title: '',
      };
      const secondsToWait = 5;
      const { result } = renderHook(() =>
        useTimer({
          task,
          resetTask: () => {},
          onTaskCreation: () => {},
          onTimerStart: () => {},
          replayTask: null,
          onTaskTimeCreation: () => {},
        }),
      );

      const times: Times = {
        hours: '00',
        minutes: '00',
        seconds: '05',
      };

      jest.spyOn(utils, 'getFormmatedTimesFromSeconds').mockImplementationOnce(() => times);
      jest.spyOn(services, 'createTask').mockResolvedValueOnce({});

      await act(async () => {
        await result.current.handleTimerClick();
      });

      act(() => {
        jest.advanceTimersByTime(secondsToWait * 1000);
      });

      const resultTimer: string = result.current.getTimerToShow();

      await act(async () => {
        await result.current.handleTimerClick();
      });

      const expected: string = `${times.hours}:${times.minutes}:${times.seconds}`;

      expect(resultTimer).toBe(expected);
      expect(utils.getFormmatedTimesFromSeconds).toHaveBeenCalled();
    }, 10000);
  });

  describe('handleTimerClick tests', () => {
    it('Stop timer and create task with success', async () => {
      const times: TaskTime = {
        createdAt: '',
        endedAt: '',
        initiatedAt: '',
        timeSpent: 0,
        updatedAt: '',
        id: 1,
      };
      const expectedTask: CreateTaskResponse = {
        createdAt: '',
        description: '',
        id: 1,
        link: '',
        times: [times],
        title: '',
        totalTimeSpent: 0,
        updatedAt: '',
      };
      const resetTask = jest.fn(() => {});
      const onTaskCreation = jest.fn(() => {});
      const onTimerStart = jest.fn(() => {});
      const task: Task = {
        description: '',
        endedAt: undefined,
        initiatedAt: undefined,
        link: '',
        title: '',
      };
      const { result } = renderHook(() =>
        useTimer({
          task,
          resetTask,
          onTaskCreation,
          onTimerStart,
          replayTask: null,
          onTaskTimeCreation: () => {},
        }),
      );

      jest.spyOn(services, 'createTask').mockResolvedValueOnce(expectedTask);

      await act(async () => {
        await result.current.handleTimerClick();
      });

      await act(async () => {
        await result.current.handleTimerClick();
      });

      expect(onTimerStart).toHaveBeenCalled();
      expect(resetTask).toHaveBeenCalled();
      expect(onTaskCreation).toHaveBeenCalled();
      expect(services.createTask).toHaveBeenCalled();
    });

    it('Stop timer and create task with error', async () => {
      const times: TaskTime = {
        createdAt: '',
        endedAt: '',
        initiatedAt: '',
        timeSpent: 0,
        updatedAt: '',
        id: 1,
      };
      const expectedTask: CreateTaskResponse = {
        createdAt: '',
        description: '',
        id: 1,
        link: '',
        times: [times],
        title: '',
        totalTimeSpent: 0,
        updatedAt: '',
      };
      const resetTask = jest.fn(() => {});
      const onTaskCreation = jest.fn(() => {});
      const onTimerStart = jest.fn(() => {});
      const task: Task = {
        description: '',
        endedAt: undefined,
        initiatedAt: undefined,
        link: '',
        title: '',
      };
      const { result } = renderHook(() =>
        useTimer({
          task,
          resetTask,
          onTaskCreation,
          onTimerStart,
          replayTask: null,
          onTaskTimeCreation: () => {},
        }),
      );

      jest.spyOn(services, 'createTask').mockRejectedValueOnce(expectedTask);

      await act(async () => {
        await result.current.handleTimerClick();
      });

      await act(async () => {
        await result.current.handleTimerClick();
      });

      expect(services.createTask).toHaveBeenCalled();
      expect(onTimerStart).toHaveBeenCalled();
      expect(resetTask).not.toHaveBeenCalled();
      expect(onTaskCreation).not.toHaveBeenCalled();
    });
  });

  describe('timer tests', () => {
    it('Count seconds correctly', async () => {
      const secondsToWait: number = 1;
      const task: Task = {
        description: '',
        endedAt: undefined,
        initiatedAt: undefined,
        link: '',
        title: '',
      };
      const { result } = renderHook(() =>
        useTimer({
          task,
          resetTask: () => {},
          onTaskCreation: () => {},
          onTimerStart: () => {},
          replayTask: null,
          onTaskTimeCreation: () => {},
        }),
      );

      jest.spyOn(services, 'createTask').mockResolvedValueOnce({});

      let timer: number = result.current.timer;
      let expected: number = 0;
      expect(timer).toBe(expected);

      await act(async () => {
        await result.current.handleTimerClick();
      });

      act(() => {
        jest.advanceTimersByTime(secondsToWait * 1000);
      });

      timer = result.current.timer;
      expected += secondsToWait;
      expect(timer).toBe(expected);

      act(() => {
        jest.advanceTimersByTime(secondsToWait * 1000);
      });

      timer = result.current.timer;
      expected += secondsToWait;
      expect(timer).toBe(expected);

      act(() => {
        jest.advanceTimersByTime(secondsToWait * 1000);
      });

      timer = result.current.timer;
      expected += secondsToWait;
      expect(timer).toBe(expected);

      await act(async () => {
        await result.current.handleTimerClick();
      });
    });
  });

  describe('createTaskTimeAction tests', () => {
    it('Creates  a task time with success', async () => {
      const secondsToWait: number = 1;
      const replayTask: Task = {
        description: '',
        endedAt: undefined,
        initiatedAt: undefined,
        link: '',
        title: '',
      };
      const { rerender, result } = renderHook(
        ({ replayTask }) =>
          useTimer({
            task: replayTask,
            resetTask: () => {},
            onTaskCreation: () => {},
            onTimerStart: () => {},
            replayTask,
            onTaskTimeCreation: () => {},
          }),
        { initialProps: { replayTask } },
      );

      jest.spyOn(services, 'createTaskTime').mockResolvedValue({});

      await waitFor(() => expect(result.current.timer).toBe(0));

      rerender({ replayTask });

      act(() => {
        jest.advanceTimersByTime(secondsToWait * 1000);
      });

      await waitFor(() => expect(result.current.timer).toBe(secondsToWait));

      act(() => {
        result.current.handleTimerClick();
      });

      expect(services.createTaskTime).toHaveBeenCalled();
    });

    it('Throws default error message on creating a task time', async () => {
      const replayTask: Task = {
        description: '',
        endedAt: undefined,
        initiatedAt: undefined,
        link: '',
        title: '',
      };
      const { result } = renderHook(
        ({ replayTask }) =>
          useTimer({
            task: replayTask,
            resetTask: () => {},
            onTaskCreation: () => {},
            onTimerStart: () => {},
            replayTask,
            onTaskTimeCreation: () => {},
          }),
        { initialProps: { replayTask } },
      );

      jest
        .spyOn(utils, 'getErrorMessage')
        .mockImplementationOnce(jest.requireActual('@utils').getErrorMessage);
      jest.spyOn(services, 'createTaskTime').mockRejectedValue(new Error());

      act(() => {
        result.current.handleTimerClick();
      });

      await waitFor(() => {
        expect(services.createTaskTime).toHaveBeenCalled();
        expect(toast.error).toHaveBeenCalledWith(CREATE_TASK_TIME_ERROR_MESSAGE);
      });
    });

    it('Throws error message on creating a task time', async () => {
      const errorMessage: string = 'Error message';
      const replayTask: Task = {
        description: '',
        endedAt: undefined,
        initiatedAt: undefined,
        link: '',
        title: '',
      };
      const { result } = renderHook(
        ({ replayTask }) =>
          useTimer({
            task: replayTask,
            resetTask: () => {},
            onTaskCreation: () => {},
            onTimerStart: () => {},
            replayTask,
            onTaskTimeCreation: () => {},
          }),
        { initialProps: { replayTask } },
      );

      jest
        .spyOn(utils, 'getErrorMessage')
        .mockImplementationOnce(jest.requireActual('@utils').getErrorMessage);
      jest.spyOn(services, 'createTaskTime').mockRejectedValue(new Error(errorMessage));

      act(() => {
        result.current.handleTimerClick();
      });

      await waitFor(() => {
        expect(services.createTaskTime).toHaveBeenCalled();
        expect(toast.error).toHaveBeenCalledWith(errorMessage);
      });
    });
  });

  describe('getButtonIcon tests', () => {
    it('Trying to get a button return object with src', async () => {
      const task: Task = {
        description: '',
        endedAt: undefined,
        initiatedAt: undefined,
        link: '',
        title: '',
      };
      const { result } = renderHook(() =>
        useTimer({
          task,
          resetTask: () => {},
          onTaskCreation: () => {},
          onTimerStart: () => {},
          replayTask: null,
          onTaskTimeCreation: () => {},
        }),
      );

      await waitFor(() => {
        const icon = result.current.getButtonIcon();

        expect(icon.src).toBeDefined();
      });

      act(() => {
        result.current.handleTimerClick();
      });

      await waitFor(() => {
        const icon = result.current.getButtonIcon();

        expect(icon.src).toBeDefined();
      });
    });
  });
});
