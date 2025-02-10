import { act, findAllByTestId, fireEvent, render, screen } from '@testing-library/react';
import { GetPaginatedTask, GetPaginatedTaskTime } from '@types';
import * as services from '@services';
import { TaskList } from './taskList.component';
import { TEST_IDS } from '../../constants';

jest.mock('@services');

describe('TaskList component tests', () => {
  describe('renderDay tests', () => {
    it('Render a day of tasks correctly', async () => {
      const taskTimeSpentFormatted: string = '00:01:00';
      const taskTimeSpent: number = 60;
      const taskTime = getTaskTimeToMock();

      taskTime.totalTimeSpent = taskTimeSpent;
      taskTime.endedAt = '2025-01-07T07:21:00.000Z';
      taskTime.initiatedAt = '2025-01-07T07:20:00.000Z';
      taskTime.task.title = 'Some title';

      const tasks: Array<GetPaginatedTaskTime> = [taskTime];

      jest.spyOn(services, 'getPaginatedTaskTimes').mockResolvedValue({
        taskTimes: tasks,
        isLastPage: true,
      });

      render(<TaskList />);

      const taskDayContainer = await screen.findAllByTestId(TEST_IDS.TASK_LIST_DAY_CONTAINER);
      const taskTitleSpan = await screen.findByText(taskTime.task.title);
      const taskTimeSpentSpan = await screen.findAllByText(taskTimeSpentFormatted);

      expect(taskDayContainer).toHaveLength(1);
      expect(taskTimeSpentSpan).toHaveLength(2);
      expect(taskTitleSpan).toBeInTheDocument();
    });

    it('Render three days of tasks correctly', async () => {
      const taskTime = getTaskTimeToMock();
      const taskTimeTwo = getTaskTimeToMock();
      const taskTimeThree = getTaskTimeToMock();

      taskTime.totalTimeSpent = 100;
      taskTime.endedAt = '2025-01-07T07:21:00.000Z';
      taskTime.initiatedAt = '2025-01-07T07:20:00.000Z';
      taskTime.task.title = 'Task title one';

      taskTimeTwo.totalTimeSpent = 90;
      taskTimeTwo.endedAt = '2025-01-09T07:21:00.000Z';
      taskTimeTwo.initiatedAt = '2025-01-09T07:20:00.000Z';
      taskTimeTwo.task.title = 'Task title two';
      taskTimeTwo.task.id = 2;

      taskTimeThree.totalTimeSpent = 80;
      taskTimeThree.endedAt = '2025-01-10T07:21:00.000Z';
      taskTimeThree.initiatedAt = '2025-01-10T07:20:00.000Z';
      taskTimeThree.task.title = 'Task title three';
      taskTimeThree.task.id = 3;

      const tasksByDay: Array<GetPaginatedTaskTime> = [taskTime, taskTimeTwo, taskTimeThree];

      jest.spyOn(services, 'getPaginatedTaskTimes').mockResolvedValue({
        taskTimes: tasksByDay,
        isLastPage: true,
      });

      render(<TaskList />);

      const taskDayContainer = await screen.findAllByTestId(TEST_IDS.TASK_LIST_DAY_CONTAINER);
      const titleOne = await screen.findByText(taskTime.task.title);
      const titleTwo = await screen.findByText(taskTimeTwo.task.title);
      const titleThree = await screen.findByText(taskTimeThree.task.title);

      expect(taskDayContainer).toHaveLength(3);
      expect(titleOne).toBeInTheDocument();
      expect(titleTwo).toBeInTheDocument();
      expect(titleThree).toBeInTheDocument();
    });
  });

  describe('renderTasks tests', () => {
    it('Render one task with three entries from a day correctly', async () => {
      const taskTime = getTaskTimeToMock();

      taskTime.endedAt = '2025-01-07T07:20:27.000Z';
      taskTime.initiatedAt = '2025-01-07T07:20:25.000Z';
      taskTime.task.title = 'Some title';

      const tasksByDay: Array<GetPaginatedTaskTime> = [taskTime, taskTime, taskTime];

      jest.spyOn(services, 'getPaginatedTaskTimes').mockResolvedValue({
        taskTimes: tasksByDay,
        isLastPage: true,
      });

      render(<TaskList />);

      const taskTimeEntryContainer = await screen.findAllByTestId(
        TEST_IDS.TASK_LIST_TASK_TIME_CONTAINER,
      );
      const taskTitleSpan = await screen.findAllByText(taskTime.task.title);
      const taskNumberOfEntriesSpan = await screen.findByText(tasksByDay.length);

      expect(taskTimeEntryContainer).toHaveLength(1);
      expect(taskTitleSpan).toHaveLength(1);
      expect(taskNumberOfEntriesSpan).toHaveTextContent('3');
    });

    it('Render two task one with two entries and one with only one entry from a day correctly', async () => {
      const taskTime = getTaskTimeToMock();

      taskTime.endedAt = '2025-01-07T07:20:27.000Z';
      taskTime.initiatedAt = '2025-01-07T07:20:25.000Z';
      taskTime.task.title = 'Some title';

      const taskTimeTwo = getTaskTimeToMock();

      taskTimeTwo.endedAt = '2025-01-07T09:20:27.000Z';
      taskTimeTwo.initiatedAt = '2025-01-07T09:20:25.000Z';
      taskTimeTwo.task.title = 'Some title two';
      taskTimeTwo.id = 2;
      taskTimeTwo.task.id = 2;

      const tasksByDay: Array<GetPaginatedTaskTime> = [taskTime, taskTime, taskTimeTwo];

      jest.spyOn(services, 'getPaginatedTaskTimes').mockResolvedValue({
        taskTimes: tasksByDay,
        isLastPage: true,
      });

      render(<TaskList />);

      const taskTimeEntryContainer = await screen.findAllByTestId(
        TEST_IDS.TASK_LIST_TASK_TIME_CONTAINER,
      );
      const taskTitleSpan = await screen.findAllByText(taskTime.task.title);
      const taskTwoTitleSpan = await screen.findAllByText(taskTimeTwo.task.title);

      expect(taskTimeEntryContainer).toHaveLength(2);
      expect(taskTitleSpan).toHaveLength(1);
      expect(taskTwoTitleSpan).toHaveLength(1);
    });
  });

  describe('renderTaskTimeEntries tests', () => {
    it('Render a task from a day with two entries correctly', async () => {
      const taskTime = getTaskTimeToMock();

      taskTime.endedAt = '2025-01-07T07:20:27.000Z';
      taskTime.initiatedAt = '2025-01-07T07:20:25.000Z';
      taskTime.task.title = 'Some title';

      const tasksByDay: Array<GetPaginatedTaskTime> = [taskTime, taskTime];

      jest.spyOn(services, 'getPaginatedTaskTimes').mockResolvedValue({
        taskTimes: tasksByDay,
        isLastPage: true,
      });

      render(<TaskList />);

      const taskEntriesButton = await screen.findByRole('button', { name: '2' });
      const taskTimeTaskContainerBeforeClick = await screen.findAllByTestId(
        TEST_IDS.TASK_LIST_TASK_TIME_CONTAINER,
      );
      const taskTimeEntryContainersBeforeClick = screen.queryAllByTestId(
        TEST_IDS.TASK_ENTRIES_CONTAINER,
      );

      expect(taskTimeTaskContainerBeforeClick).toHaveLength(1);
      expect(taskTimeEntryContainersBeforeClick).toHaveLength(0);

      act(() => {
        fireEvent.click(taskEntriesButton);
      });

      const taskTimeEntryContainersAfterClick = await screen.findAllByTestId(
        TEST_IDS.TASK_ENTRIES_CONTAINER,
      );
      const taskTimeTaskContainerAfterClick = await screen.findAllByTestId(
        TEST_IDS.TASK_LIST_TASK_TIME_CONTAINER,
      );

      expect(taskTimeTaskContainerAfterClick).toHaveLength(1);
      expect(taskTimeEntryContainersAfterClick).toHaveLength(2);
    });
  });

  describe('renderTaskNumberOfEntries tests', () => {
    it('Render a day with one task with only one entry without entries button correctly', async () => {
      const taskTime = getTaskTimeToMock();

      taskTime.endedAt = '2025-01-07T07:20:27.000Z';
      taskTime.initiatedAt = '2025-01-07T07:20:25.000Z';
      taskTime.task.title = 'Some title';

      const tasksByDay: Array<GetPaginatedTaskTime> = [taskTime];

      jest.spyOn(services, 'getPaginatedTaskTimes').mockResolvedValue({
        taskTimes: tasksByDay,
        isLastPage: true,
      });

      render(<TaskList />);

      const taskEntriesButton = screen.queryByRole('button', { name: '1' });
      const taskTimeTaskContainerBeforeClick = await screen.findAllByTestId(
        TEST_IDS.TASK_LIST_TASK_TIME_CONTAINER,
      );

      expect(taskTimeTaskContainerBeforeClick).toHaveLength(1);
      expect(taskEntriesButton).not.toBeInTheDocument();
    });

    it('Render a day of task with one task with two entries with entry button corectly', async () => {
      const taskTime = getTaskTimeToMock();

      taskTime.endedAt = '2025-01-07T07:20:27.000Z';
      taskTime.initiatedAt = '2025-01-07T07:20:25.000Z';
      taskTime.task.title = 'Some title';

      const tasksByDay: Array<GetPaginatedTaskTime> = [taskTime, taskTime];

      jest.spyOn(services, 'getPaginatedTaskTimes').mockResolvedValue({
        taskTimes: tasksByDay,
        isLastPage: true,
      });

      render(<TaskList />);

      const taskEntriesButton = await screen.findByRole('button', { name: '2' });
      const taskTimeTaskContainerBeforeClick = await screen.findAllByTestId(
        TEST_IDS.TASK_LIST_TASK_TIME_CONTAINER,
      );

      expect(taskTimeTaskContainerBeforeClick).toHaveLength(1);
      expect(taskEntriesButton).toBeInTheDocument();
    });
  });

  function getTaskTimeToMock() {
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
      totalTimeSpent: 0,
    };

    return taskTime;
  }
});
