import { act, fireEvent, render, screen } from '@testing-library/react';
import { Timer } from './timer.component';
import { Task } from '@/types';
import { TEST_IDS } from '../../constants';

describe('Timer component tests', () => {
  it('Renders timer correctly', async () => {
    const task: Task = {
      description: '',
      link: '',
      title: '',
      endedAt: undefined,
      initiatedAt: undefined,
    };

    render(
      <Timer onTaskCreation={() => {}} resetTask={() => {}} onTimerStart={() => {}} task={task} />,
    );

    const timerText = await screen.findByTestId(TEST_IDS.TIMER_TEXT);
    const timerButton = await screen.findByRole('button');

    expect(timerText).toBeInTheDocument();
    expect(timerButton).toBeInTheDocument();
  });

  it('Renders timer correctly', async () => {
    jest.useFakeTimers();

    const secondsToWait = 5;
    const task: Task = {
      description: '',
      link: '',
      title: '',
      endedAt: undefined,
      initiatedAt: undefined,
    };

    render(
      <Timer onTaskCreation={() => {}} resetTask={() => {}} onTimerStart={() => {}} task={task} />,
    );

    const timerText = await screen.findByTestId(TEST_IDS.TIMER_TEXT);
    const timerButton = await screen.findByRole('button');
    const timerImage = await screen.findByTestId(TEST_IDS.TIMER_BUTTON_IMAGE);

    expect(timerText).toBeInTheDocument();
    expect(timerButton).toBeInTheDocument();
    expect(timerImage).toBeInTheDocument();
    expect(timerText).toHaveTextContent('00:00:00');

    fireEvent.click(timerButton);

    act(() => {
      jest.advanceTimersByTime(secondsToWait * 1000);
    });

    expect(timerText).toHaveTextContent(`00:00:0${secondsToWait}`);
  }, 10000);
});
