import { renderHook, act } from '@testing-library/react';
import { CreateTaskResponse, Task, TaskTime, Times } from '@types';
import * as utils from '@utils';
import * as services from '@services';
import { useTimer } from './useTimer.hook';

jest.mock('@utils');

jest.mock('@services');

describe('useTimer hook tests', () => {
  describe('getTimerToShow tests', () => {
    it('Retuns timer as string', () => {
      const resetTask = jest.fn();
      const onTaskCreation = jest.fn();
      const onTimerStart = jest.fn();
      const task: Task = {
        description: '',
        endedAt: undefined,
        initiatedAt: undefined,
        link: '',
        title: '',
      };
      const secondsToWait = 5;
      const { result } = renderHook(() =>
        useTimer({ task, resetTask, onTaskCreation, onTimerStart }),
      );
      jest.useFakeTimers();

      const times: Times = {
        hours: '00',
        minutes: '00',
        seconds: '05',
      };

      jest.spyOn(utils, 'getFormmatedTimesFromSeconds').mockImplementationOnce(() => times);
      jest.spyOn(services, 'createTask').mockResolvedValueOnce({});

      act(() => {
        result.current.handleTimerClick();
      });

      act(() => {
        jest.advanceTimersByTime(secondsToWait * 1000);
      });

      const resultTimer: string = result.current.getTimerToShow();

      act(() => {
        result.current.handleTimerClick();
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
      const resetTask = jest.fn();
      const onTaskCreation = jest.fn();
      const onTimerStart = jest.fn();
      const task: Task = {
        description: '',
        endedAt: undefined,
        initiatedAt: undefined,
        link: '',
        title: '',
      };
      const { result } = renderHook(() =>
        useTimer({ task, resetTask, onTaskCreation, onTimerStart }),
      );

      jest.spyOn(services, 'createTask').mockResolvedValueOnce(expectedTask);

      act(() => {
        result.current.handleTimerClick();
      });

      act(() => {
        result.current.handleTimerClick();
      });

      expect(onTimerStart).toHaveBeenCalled();
      expect(onTaskCreation).toHaveBeenCalled();
      expect(resetTask).toHaveBeenCalled();
      expect(services.createTask).toHaveBeenCalled();
    });
  });
});
