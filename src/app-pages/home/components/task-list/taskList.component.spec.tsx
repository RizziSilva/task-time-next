import { render, screen } from '@testing-library/react';
import { GetPaginatedTask, GetPaginatedTaskTime } from '@types';
import * as useTaskListMock from './hooks/useTaskList.hook';
import { TaskList } from './taskList.component';
import { TEST_IDS } from '../../constants';

jest.mock('./hooks/useTaskList.hook');

describe('TaskList component tests', () => {
  it('Render a day of tasks correctly', async () => {
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
    const tasksByDay: Array<Array<GetPaginatedTaskTime>> = [[taskTime]];
    const isLastPage: boolean = true;
    const handleLoadMoreClick = jest.fn();
    const getFormattedDayString = jest.fn();
    const getStringTimeFromDateString = jest.fn();
    const getTotalTimeSpentFromDay = jest.fn();

    jest.spyOn(useTaskListMock, 'useTaskList').mockReturnValue({
      tasksByDay,
      isLastPage,
      handleLoadMoreClick,
      getFormattedDayString,
      getStringTimeFromDateString,
      getTotalTimeSpentFromTimeEntries: getTotalTimeSpentFromDay,
    });

    render(<TaskList />);

    const taskDayContainer = await screen.findAllByTestId(TEST_IDS.TASK_LIST_DAY_CONTAINER);

    expect(taskDayContainer).toHaveLength(tasksByDay.length);
    expect(getFormattedDayString).toHaveBeenCalled();
    expect(getTotalTimeSpentFromDay).toHaveBeenCalled();
  });

  it('Render three days of tasks correctly', async () => {
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
      totalTimeSpent: 100,
    };
    const tasksByDay: Array<Array<GetPaginatedTaskTime>> = [[taskTime], [taskTime], [taskTime]];
    const isLastPage: boolean = true;
    const handleLoadMoreClick = jest.fn();
    const getFormattedDayString = jest.fn();
    const getStringTimeFromDateString = jest.fn();
    const getTotalTimeSpentFromDay = jest.fn();

    jest.spyOn(useTaskListMock, 'useTaskList').mockReturnValue({
      tasksByDay,
      isLastPage,
      handleLoadMoreClick,
      getFormattedDayString,
      getStringTimeFromDateString,
      getTotalTimeSpentFromTimeEntries: getTotalTimeSpentFromDay,
    });

    render(<TaskList />);

    const taskDayContainer = await screen.findAllByTestId(TEST_IDS.TASK_LIST_DAY_CONTAINER);

    expect(taskDayContainer).toHaveLength(tasksByDay.length);
    expect(getFormattedDayString).toHaveBeenCalled();
    expect(getTotalTimeSpentFromDay).toHaveBeenCalled();
  });

  it('Render task time entries from a day correctly', async () => {
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
      totalTimeSpent: 60,
    };
    const tasksByDay: Array<Array<GetPaginatedTaskTime>> = [[taskTime, taskTime, taskTime]];
    const isLastPage: boolean = true;
    const handleLoadMoreClick = jest.fn();
    const getFormattedDayString = jest.fn();
    const getStringTimeFromDateString = jest.fn();
    const getTotalTimeSpentFromDay = jest.fn();

    jest.spyOn(useTaskListMock, 'useTaskList').mockReturnValue({
      tasksByDay,
      isLastPage,
      handleLoadMoreClick,
      getFormattedDayString,
      getStringTimeFromDateString,
      getTotalTimeSpentFromTimeEntries: getTotalTimeSpentFromDay,
    });

    render(<TaskList />);

    const taskTimeEntryContainer = await screen.findAllByTestId(
      TEST_IDS.TASK_LIST_TASK_TIME_CONTAINER,
    );
    const taskTitleSpan = await screen.findAllByText(task.title);

    expect(taskTimeEntryContainer).toHaveLength(tasksByDay[0].length);
    expect(taskTitleSpan).toHaveLength(tasksByDay[0].length);
    expect(getStringTimeFromDateString).toHaveBeenCalledTimes(6);
  });
});
