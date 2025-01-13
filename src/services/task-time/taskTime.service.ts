'use server';

import { GetPaginatedTaskTimesRequest, GetRequestParameters } from '@types';
import { getRequest } from '../instance/instance.service';

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
