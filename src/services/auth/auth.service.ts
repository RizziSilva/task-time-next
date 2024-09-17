'use server';

import { postRequest } from '@/app/utils/instance/instance.util';
import { PostRequestParameters, LoginRequestType } from '@types';

export async function login(requestBody: LoginRequestType): Promise<any> {
  const body: BodyInit = JSON.stringify(requestBody);
  const requestOptions: PostRequestParameters = { url: '/auth/login', body };
  const response: Response = await postRequest(requestOptions);
  const responseJson: any = await response.json();

  if (response.ok) return responseJson;
  else throw new Error(responseJson.message);
}
