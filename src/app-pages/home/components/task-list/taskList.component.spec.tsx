import { render, screen } from '@testing-library/react';
import { GetPaginatedTask, GetPaginatedTaskTime } from '@types';
import * as useTaskListMock from './hooks/useTaskList.hook';
import { TaskList } from './taskList.component';
import { TEST_IDS } from '../../constants';

jest.mock('./hooks/useTaskList.hook');

const defaultMock = {
  tasksByDay: [[[]]],
  isLastPage: true,
  page: 1,
  handleLoadMoreClick: jest.fn(),
  getFormattedDayString: jest.fn(),
  getStringTimeFromDateString: jest.fn(),
  getTotalTimeSpentFromDay: jest.fn(),
  getTotalTimeSpentFromTask: jest.fn(),
  handleClickShowTaskEntries: jest.fn(),
  getTotalTimeSpentFromTaskEntry: jest.fn(),
  getIsOpenedTaskEntries: jest.fn(),
};

describe('TaskList component tests', () => {
  describe('renderDay tests', () => {
    it('Render a day of tasks correctly', async () => {
      const taskTimeSpentFormatted: string = '00:01:00';
      const taskTimeSpent: number = 60;
      const task: GetPaginatedTask = {
        description: '',
        id: 1,
        link: '',
        title: 'Some title',
      };
      const taskTime: GetPaginatedTaskTime = {
        endedAt: '',
        id: 1,
        initiatedAt: '',
        task: task,
        totalTimeSpent: taskTimeSpent,
      };
      const tasksByDay: Array<Array<Array<GetPaginatedTaskTime>>> = [[[taskTime]]];
      const getFormattedDayString = jest.fn();
      const getTotalTimeSpentFromDay = jest.fn().mockReturnValue('00:01:00');

      jest.spyOn(useTaskListMock, 'useTaskList').mockReturnValue({
        ...defaultMock,
        tasksByDay,
        getFormattedDayString,
        getTotalTimeSpentFromDay,
      });

      render(<TaskList />);

      const taskDayContainer = await screen.findAllByTestId(TEST_IDS.TASK_LIST_DAY_CONTAINER);
      const taskTitleSpan = await screen.findByText(task.title);
      const taskTimeSpentSpan = await screen.findByText(taskTimeSpentFormatted);

      expect(taskDayContainer).toHaveLength(tasksByDay.length);
      expect(taskTitleSpan).toBeInTheDocument();
      expect(taskTimeSpentSpan).toBeInTheDocument();
      expect(getFormattedDayString).toHaveBeenCalled();
      expect(getTotalTimeSpentFromDay).toHaveBeenCalled();
    });

    it('Render three days of tasks correctly', async () => {
      const task: GetPaginatedTask = {
        description: '',
        id: 1,
        link: '',
        title: 'Title',
      };
      const taskTime: GetPaginatedTaskTime = {
        endedAt: '',
        id: 1,
        initiatedAt: '',
        task: task,
        totalTimeSpent: 100,
      };
      const tasksByDay: Array<Array<Array<GetPaginatedTaskTime>>> = [
        [[taskTime]],
        [[taskTime]],
        [[taskTime]],
      ];
      const getFormattedDayString = jest.fn();
      const getTotalTimeSpentFromDay = jest.fn();

      jest.spyOn(useTaskListMock, 'useTaskList').mockReturnValue({
        ...defaultMock,
        tasksByDay,
        getFormattedDayString,
        getTotalTimeSpentFromDay,
      });

      render(<TaskList />);

      const taskDayContainer = await screen.findAllByTestId(TEST_IDS.TASK_LIST_DAY_CONTAINER);

      expect(taskDayContainer).toHaveLength(tasksByDay.length);
      expect(getFormattedDayString).toHaveBeenCalledTimes(3);
      expect(getTotalTimeSpentFromDay).toHaveBeenCalledTimes(3);
    });
  });

  describe('renderTasks tests', () => {
    it('Render task from a day correctly', async () => {
      const task: GetPaginatedTask = {
        description: '',
        id: 1,
        link: '',
        title: 'Some title',
      };
      const taskTime: GetPaginatedTaskTime = {
        endedAt: '2025-01-07T07:20:27.000Z',
        id: 1,
        initiatedAt: '2025-01-07T07:20:25.000Z',
        task: task,
        totalTimeSpent: 60,
      };
      const tasksByDay: Array<Array<Array<GetPaginatedTaskTime>>> = [
        [[taskTime, taskTime, taskTime]],
      ];

      const getStringTimeFromDateString = jest.fn();
      const getTotalTimeSpentFromTask = jest.fn();
      const getIsOpenedTaskEntries = jest.fn();

      jest.spyOn(useTaskListMock, 'useTaskList').mockReturnValue({
        ...defaultMock,
        tasksByDay,
        getStringTimeFromDateString,
        getTotalTimeSpentFromTask,
        getIsOpenedTaskEntries,
      });

      render(<TaskList />);

      const taskTimeEntryContainer = await screen.findAllByTestId(
        TEST_IDS.TASK_LIST_TASK_TIME_CONTAINER,
      );
      const taskTitleSpan = await screen.findAllByText(task.title);
      const taskNumberOfEntriesSpan = await screen.findByText(tasksByDay[0][0].length);

      expect(taskTimeEntryContainer).toHaveLength(tasksByDay[0].length);
      expect(taskTitleSpan).toHaveLength(1);
      expect(taskNumberOfEntriesSpan).toHaveTextContent(`${tasksByDay[0][0].length}`);
      expect(getStringTimeFromDateString).toHaveBeenCalledTimes(2);
      expect(getStringTimeFromDateString).toHaveBeenCalledWith(taskTime.endedAt);
      expect(getStringTimeFromDateString).toHaveBeenCalledWith(taskTime.initiatedAt);
      expect(getTotalTimeSpentFromTask).toHaveBeenCalled();
      expect(getIsOpenedTaskEntries).toHaveBeenCalledWith(task.id);
    });

    it('Render two task from a day correctly', async () => {
      const task: GetPaginatedTask = {
        description: '',
        id: 1,
        link: '',
        title: 'Some title',
      };
      const taskTime: GetPaginatedTaskTime = {
        endedAt: '2025-01-07T07:20:27.000Z',
        id: 1,
        initiatedAt: '2025-01-07T07:20:25.000Z',
        task: task,
        totalTimeSpent: 60,
      };
      const taskTwo: GetPaginatedTask = {
        description: '',
        id: 2,
        link: '',
        title: 'Some title two',
      };
      const taskTimeTwo: GetPaginatedTaskTime = {
        endedAt: '2025-01-07T07:20:27.000Z',
        id: 2,
        initiatedAt: '2025-01-07T07:20:25.000Z',
        task: taskTwo,
        totalTimeSpent: 60,
      };
      const tasksByDay: Array<Array<Array<GetPaginatedTaskTime>>> = [
        [[taskTime, taskTime], [taskTimeTwo]],
      ];

      const getStringTimeFromDateString = jest.fn();
      const getTotalTimeSpentFromTask = jest.fn();
      const getIsOpenedTaskEntries = jest.fn();

      jest.spyOn(useTaskListMock, 'useTaskList').mockReturnValue({
        ...defaultMock,
        tasksByDay,
        getStringTimeFromDateString,
        getTotalTimeSpentFromTask,
        getIsOpenedTaskEntries,
      });

      render(<TaskList />);

      const taskTimeEntryContainer = await screen.findAllByTestId(
        TEST_IDS.TASK_LIST_TASK_TIME_CONTAINER,
      );
      const taskTitleSpan = await screen.findAllByText(task.title);
      const taskTwoTitleSpan = await screen.findAllByText(taskTwo.title);

      expect(taskTimeEntryContainer).toHaveLength(tasksByDay[0].length);
      expect(taskTitleSpan).toHaveLength(1);
      expect(taskTwoTitleSpan).toHaveLength(1);
      expect(getStringTimeFromDateString).toHaveBeenCalledTimes(4);
      expect(getTotalTimeSpentFromTask).toHaveBeenCalledTimes(2);
      expect(getIsOpenedTaskEntries).toHaveBeenCalledWith(task.id);
      expect(getIsOpenedTaskEntries).toHaveBeenCalledWith(taskTwo.id);
    });
  });
});
