'use server';

import {
  CreateTaskTimeRequest,
  GetPaginatedTaskTimesRequest,
  GetRequestParameters,
  PostRequestParameters,
} from '@types';
import { getRequest, postRequest } from '../instance/instance.service';

export async function getPaginatedTaskTimes(
  requestParams: GetPaginatedTaskTimesRequest,
): Promise<any> {
  const urlQueryString: string = new URLSearchParams({
    page: requestParams.page.toString(),
  }).toString();
  const requestOptions: GetRequestParameters = { url: `/task-time/paginated?${urlQueryString}` };
  const response: Response = await getRequest(requestOptions);
  const responseJson: any = await response.json();

  if (response.ok) return responseJson;
  else throw new Error(responseJson.message);
}

export async function createTaskTime(requestBody: CreateTaskTimeRequest): Promise<any> {
  const body: BodyInit = JSON.stringify(requestBody);
  const requestOptions: PostRequestParameters = { url: '/task-time', body };
  const response: Response = await postRequest(requestOptions);
  const responseJson: any = await response.json();

  if (response.ok) return responseJson;
  else throw new Error(responseJson.message);
}
