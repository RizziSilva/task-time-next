import { act, fireEvent, render, screen } from '@testing-library/react';
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
      const task: GetPaginatedTask = {
        description: '',
        id: 1,
        link: '',
        title: 'Some title',
      };
      const taskTime: GetPaginatedTaskTime = {
        endedAt: '2025-01-07T07:21:00.000Z',
        id: 1,
        initiatedAt: '2025-01-07T07:20:00.000Z',
        task: task,
        totalTimeSpent: taskTimeSpent,
      };
      const tasks: Array<GetPaginatedTaskTime> = [taskTime];

      jest.spyOn(services, 'getPaginatedTaskTimes').mockResolvedValue({
        taskTimes: tasks,
        isLastPage: false,
      });

      render(<TaskList />);

      const taskDayContainer = await screen.findAllByTestId(TEST_IDS.TASK_LIST_DAY_CONTAINER);
      const taskTitleSpan = await screen.findByText(task.title);
      const taskTimeSpentSpan = await screen.findAllByText(taskTimeSpentFormatted);

      expect(taskDayContainer).toHaveLength(1);
      expect(taskTimeSpentSpan).toHaveLength(2);
      expect(taskTitleSpan).toBeInTheDocument();
    });

    // it('Render three days of tasks correctly', async () => {
    //   const task: GetPaginatedTask = {
    //     description: '',
    //     id: 1,
    //     link: '',
    //     title: 'Title',
    //   };
    //   const taskTime: GetPaginatedTaskTime = {
    //     endedAt: '',
    //     id: 1,
    //     initiatedAt: '',
    //     task: task,
    //     totalTimeSpent: 100,
    //   };
    //   const tasksByDay: Array<Array<Array<GetPaginatedTaskTime>>> = [
    //     [[taskTime]],
    //     [[taskTime]],
    //     [[taskTime]],
    //   ];
    //   const getFormattedDayString = jest.fn();
    //   const getTotalTimeSpentFromDay = jest.fn();

    //   jest.spyOn(useTaskListMock, 'useTaskList').mockReturnValue({
    //     ...defaultMock,
    //     tasksByDay,
    //     getFormattedDayString,
    //     getTotalTimeSpentFromDay,
    //   });

    //   render(<TaskList />);

    //   const taskDayContainer = await screen.findAllByTestId(TEST_IDS.TASK_LIST_DAY_CONTAINER);

    //   expect(taskDayContainer).toHaveLength(tasksByDay.length);
    //   expect(getFormattedDayString).toHaveBeenCalledTimes(3);
    //   expect(getTotalTimeSpentFromDay).toHaveBeenCalledTimes(3);
    // });
  });

  // describe('renderTasks tests', () => {
  //   it('Render task from a day correctly', async () => {
  //     const task: GetPaginatedTask = {
  //       description: '',
  //       id: 1,
  //       link: '',
  //       title: 'Some title',
  //     };
  //     const taskTime: GetPaginatedTaskTime = {
  //       endedAt: '2025-01-07T07:20:27.000Z',
  //       id: 1,
  //       initiatedAt: '2025-01-07T07:20:25.000Z',
  //       task: task,
  //       totalTimeSpent: 60,
  //     };
  //     const tasksByDay: Array<Array<Array<GetPaginatedTaskTime>>> = [
  //       [[taskTime, taskTime, taskTime]],
  //     ];

  //     const getStringTimeFromDateString = jest.fn();
  //     const getTotalTimeSpentFromTask = jest.fn();
  //     const getIsOpenedTaskEntries = jest.fn();

  //     jest.spyOn(useTaskListMock, 'useTaskList').mockReturnValue({
  //       ...defaultMock,
  //       tasksByDay,
  //       getStringTimeFromDateString,
  //       getTotalTimeSpentFromTask,
  //       getIsOpenedTaskEntries,
  //     });

  //     render(<TaskList />);

  //     const taskTimeEntryContainer = await screen.findAllByTestId(
  //       TEST_IDS.TASK_LIST_TASK_TIME_CONTAINER,
  //     );
  //     const taskTitleSpan = await screen.findAllByText(task.title);
  //     const taskNumberOfEntriesSpan = await screen.findByText(tasksByDay[0][0].length);

  //     expect(taskTimeEntryContainer).toHaveLength(tasksByDay[0].length);
  //     expect(taskTitleSpan).toHaveLength(1);
  //     expect(taskNumberOfEntriesSpan).toHaveTextContent(`${tasksByDay[0][0].length}`);
  //     expect(getStringTimeFromDateString).toHaveBeenCalledTimes(2);
  //     expect(getStringTimeFromDateString).toHaveBeenCalledWith(taskTime.endedAt);
  //     expect(getStringTimeFromDateString).toHaveBeenCalledWith(taskTime.initiatedAt);
  //     expect(getTotalTimeSpentFromTask).toHaveBeenCalled();
  //     expect(getIsOpenedTaskEntries).toHaveBeenCalledWith(task.id);
  //   });

  //   it('Render two task from a day correctly', async () => {
  //     const task: GetPaginatedTask = {
  //       description: '',
  //       id: 1,
  //       link: '',
  //       title: 'Some title',
  //     };
  //     const taskTime: GetPaginatedTaskTime = {
  //       endedAt: '2025-01-07T07:20:27.000Z',
  //       id: 1,
  //       initiatedAt: '2025-01-07T07:20:25.000Z',
  //       task: task,
  //       totalTimeSpent: 60,
  //     };
  //     const taskTwo: GetPaginatedTask = {
  //       description: '',
  //       id: 2,
  //       link: '',
  //       title: 'Some title two',
  //     };
  //     const taskTimeTwo: GetPaginatedTaskTime = {
  //       endedAt: '2025-01-07T07:20:27.000Z',
  //       id: 2,
  //       initiatedAt: '2025-01-07T07:20:25.000Z',
  //       task: taskTwo,
  //       totalTimeSpent: 60,
  //     };
  //     const tasksByDay: Array<Array<Array<GetPaginatedTaskTime>>> = [
  //       [[taskTime, taskTime], [taskTimeTwo]],
  //     ];

  //     const getStringTimeFromDateString = jest.fn();
  //     const getTotalTimeSpentFromTask = jest.fn();
  //     const getIsOpenedTaskEntries = jest.fn();

  //     jest.spyOn(useTaskListMock, 'useTaskList').mockReturnValue({
  //       ...defaultMock,
  //       tasksByDay,
  //       getStringTimeFromDateString,
  //       getTotalTimeSpentFromTask,
  //       getIsOpenedTaskEntries,
  //     });

  //     render(<TaskList />);

  //     const taskTimeEntryContainer = await screen.findAllByTestId(
  //       TEST_IDS.TASK_LIST_TASK_TIME_CONTAINER,
  //     );
  //     const taskTitleSpan = await screen.findAllByText(task.title);
  //     const taskTwoTitleSpan = await screen.findAllByText(taskTwo.title);

  //     expect(taskTimeEntryContainer).toHaveLength(tasksByDay[0].length);
  //     expect(taskTitleSpan).toHaveLength(1);
  //     expect(taskTwoTitleSpan).toHaveLength(1);
  //     expect(getStringTimeFromDateString).toHaveBeenCalledTimes(4);
  //     expect(getTotalTimeSpentFromTask).toHaveBeenCalledTimes(2);
  //     expect(getIsOpenedTaskEntries).toHaveBeenCalledWith(task.id);
  //     expect(getIsOpenedTaskEntries).toHaveBeenCalledWith(taskTwo.id);
  //   });
  // });

  // describe('renderTaskTimeEntries tests', () => {
  //   it('Render a task with 2 entries', async () => {
  //     const task: GetPaginatedTask = {
  //       description: '',
  //       id: 1,
  //       link: '',
  //       title: 'Some title',
  //     };
  //     const taskTime: GetPaginatedTaskTime = {
  //       endedAt: '2025-01-07T07:20:27.000Z',
  //       id: 1,
  //       initiatedAt: '2025-01-07T07:20:25.000Z',
  //       task: task,
  //       totalTimeSpent: 60,
  //     };
  //     const taskTimeTwo: GetPaginatedTaskTime = {
  //       endedAt: '2025-01-07T07:20:27.000Z',
  //       id: 2,
  //       initiatedAt: '2025-01-07T07:20:25.000Z',
  //       task: task,
  //       totalTimeSpent: 60,
  //     };
  //     const tasksByDay: Array<Array<Array<GetPaginatedTaskTime>>> = [[[taskTime, taskTimeTwo]]];

  //     const getStringTimeFromDateString = jest.fn();
  //     const getTotalTimeSpentFromTaskEntry = jest.fn();

  //     jest.spyOn(useTaskListMock, 'useTaskList').mockReturnValue({
  //       ...defaultMock,
  //       tasksByDay,
  //       getStringTimeFromDateString,
  //       getTotalTimeSpentFromTaskEntry,
  //     });

  //     render(<TaskList />);

  //     const taskEntriesButton = await screen.findByRole('button', { name: '2' });
  //     const taskTimeEntryContainersBeforeClick = screen.queryAllByTestId(
  //       TEST_IDS.TASK_ENTRIES_CONTAINER,
  //     );

  //     expect(taskTimeEntryContainersBeforeClick).toHaveLength(0);
  //     expect(getStringTimeFromDateString).toHaveBeenCalledTimes(2);
  //     expect(getTotalTimeSpentFromTaskEntry).not.toHaveBeenCalled();

  //     act(() => {
  //       fireEvent.click(taskEntriesButton);
  //     });

  //     const taskTimeEntryContainersAfterClick = await screen.findAllByTestId(
  //       TEST_IDS.TASK_ENTRIES_CONTAINER,
  //     );

  //     expect(taskTimeEntryContainersAfterClick).toHaveLength(2);
  //     expect(getStringTimeFromDateString).toHaveBeenCalledTimes(6);
  //     expect(getTotalTimeSpentFromTaskEntry).toHaveBeenCalledTimes(2);
  //   });
  // });
});
