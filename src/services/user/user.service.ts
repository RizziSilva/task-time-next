'use server';

import { PostRequestParameters, CreateUserRequest, GetRequestParameters } from '@types';
import { postRequest } from '../request/instance.service';
import { getRequest } from '@/app/utils/instance/instance.util';

export async function createUser(requestBody: CreateUserRequest): Promise<any> {
  const body: BodyInit = JSON.stringify(requestBody);
  const requestOptions: PostRequestParameters = { url: '/user', body };
  const response: Response = await postRequest(requestOptions);
  const responseJson: any = await response.json();

  if (response.ok) return responseJson;
  else throw new Error(responseJson.message);
}

export async function getUser() {
  const requestOptions: GetRequestParameters = { url: '/user' };
  const response: Response = await getRequest(requestOptions);
  const responseJson: any = await response.json();

  if (response.ok) return responseJson;
  else throw new Error(responseJson.message);
}
