import { getErrorMessage } from '@utils';
import { createTask } from '@services';
import { CREATE_TASK_ERROR_MESAGE, FIELD_KEYS } from '../../../constants';

export async function createTaskAction(task) {
  try {
    const now = new Date();
    const body = { ...task, [FIELD_KEYS.ENDED_AT]: now };
    const { data } = await createTask(body);

    return { newTask: data };
  } catch (error) {
    console.error(error);

    const errorMessage = getErrorMessage(error, CREATE_TASK_ERROR_MESAGE);

    return { error: errorMessage };
  }
}
