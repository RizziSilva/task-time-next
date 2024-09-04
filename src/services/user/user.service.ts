import { PostRequestParameters, CreateUserRequest, GetRequestParameters } from '@types';
import { getRequest, postRequest } from '../request/instance.service';

export class UserService {
  async createUser(requestBody: CreateUserRequest): Promise<any> {
    const body: BodyInit = JSON.stringify(requestBody);
    const requestOptions: PostRequestParameters = { url: '/user', body, isServerSide: true };
    const response: Response = await postRequest(requestOptions);
    const responseJson: any = await response.json();

    if (response.ok) return responseJson;
    else throw new Error(responseJson.message);
  }

  async getUser(): Promise<any> {
    const requestOptions: GetRequestParameters = { url: '/user' };
    const response: Response = await getRequest(requestOptions);
    const responseJson: any = await response.json();

    if (response.ok) return responseJson;
    else throw new Error(responseJson.message);
  }
}
