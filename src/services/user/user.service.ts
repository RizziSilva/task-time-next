import { PostRequestParameters, CreateUserRequest } from '@types';
import { postRequest } from '../request/instance.service';

export class UserService {
  async createUser(requestBody: CreateUserRequest): Promise<any> {
    const body: BodyInit = JSON.stringify(requestBody);
    const requestOptions: PostRequestParameters = { url: '/user', body };
    const response: Response = await postRequest(requestOptions);
    const responseJson: any = await response.json();

    if (response.ok) return responseJson;
    else throw new Error(responseJson.message);
  }
}
