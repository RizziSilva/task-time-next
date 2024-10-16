import { PostRequestParameters } from '@types';
import { postRequest } from '../instance/instance.service';

export async function createTask(requestBody) {
  const body: BodyInit = JSON.stringify(requestBody);
  const requestOptions: PostRequestParameters = { url: '/task', body };
  console.log('teste');
  const response: Response = await postRequest(requestOptions);
  const responseJson: any = await response.json();

  if (response.ok) return responseJson;
  else throw new Error(responseJson.message);
}
