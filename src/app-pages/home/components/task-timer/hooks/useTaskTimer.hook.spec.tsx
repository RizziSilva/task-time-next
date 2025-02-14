import { ChangeEvent } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Task } from '@types';
import { FIELD_KEYS, INITIAL_TASK_STATE } from '../../../constants';
import { useTaskTimer } from './useTaskTimer.hook';

describe('useTaskTimer tests', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('onTimerStart tests', () => {
    it('Set current date when task is started', () => {
      const replayTask: Task | null = null;
      const { result } = renderHook(() => useTaskTimer({ replayTask }));

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
      const replayTask: Task | null = null;
      const { result } = renderHook(() => useTaskTimer({ replayTask }));

      act(() => {
        result.current.resetTask();
      });

      const actual: Task = result.current.task;
      const expected: Task = INITIAL_TASK_STATE;

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('Replay task tests', () => {
    it('Start timer with a replay task', async () => {
      const replayTask: Task | null = {
        description: '',
        endedAt: undefined,
        initiatedAt: new Date(),
        link: '',
        title: '',
        id: 1,
      };
      const { result } = renderHook(() => useTaskTimer({ replayTask }));

      await waitFor(() => {
        const task: Task = result.current.task;

        expect(task).toEqual(replayTask);
      });
    });

    it('Doesnt start replay task when task is missing', async () => {
      const replayTask: Task | null = null;
      const { result } = renderHook(() => useTaskTimer({ replayTask }));

      await waitFor(() => {
        const task: Task = result.current.task;

        expect(task).toEqual(INITIAL_TASK_STATE);
      });
    });
  });

  describe('handleInputChange tests', () => {
    it('Change task value on input change', async () => {
      const replayTask: Task | null = null;
      const { result } = renderHook(() => useTaskTimer({ replayTask }));
      const expectedTitle: string = 'Expected Title';

      act(() => {
        const event: ChangeEvent<HTMLInputElement> = {
          target: { value: expectedTitle, name: FIELD_KEYS.TITLE },
        } as ChangeEvent<HTMLInputElement>;

        result.current.handleInputChange(event);
      });

      const task: Task = result.current.task;

      expect(task.title).toEqual(expectedTitle);
    });
  });

  describe('handleAdditionalInfoButtonClick tests', () => {
    it('Change additional info is open on function call', async () => {
      const replayTask: Task | null = null;
      const { result } = renderHook(() => useTaskTimer({ replayTask }));
      let isAdditionalInfoOpen: boolean = result.current.isAdditionalInfoOpen;

      expect(isAdditionalInfoOpen).toBe(false);

      act(() => {
        result.current.handleAdditionalInfoButtonClick();
      });

      isAdditionalInfoOpen = result.current.isAdditionalInfoOpen;

      expect(isAdditionalInfoOpen).toBe(true);
    });
  });
});
