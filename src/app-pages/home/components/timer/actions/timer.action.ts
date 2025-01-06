import { toast } from 'react-toastify';
import { getErrorMessage } from '@utils';
import { createTask } from '@services';
import { CreateTaskResponse, Task } from '@/types';
import { CREATE_TASK_ERROR_MESAGE } from '../../../constants';

export async function createTaskAction(task: Task): Promise<CreateTaskResponse | undefined> {
  try {
    const response = await createTask(task);
    const newTask: CreateTaskResponse = response;

    return newTask;
  } catch (error) {
    console.error(error);

    const errorMessage = getErrorMessage(error, CREATE_TASK_ERROR_MESAGE);
    toast.error(errorMessage);
  }
}
