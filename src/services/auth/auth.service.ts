import { PostRequestParameters, LoginRequestType } from '@types';
import { postRequest } from '../request/instance-server.service';

export class AuthService {
  async login(requestBody: LoginRequestType): Promise<any> {
    const body: BodyInit = JSON.stringify(requestBody);
    const requestOptions: PostRequestParameters = { url: '/auth/login', body };
    const response: Response = await postRequest(requestOptions);
    const responseJson: any = await response.json();

    if (response.ok) return responseJson;
    else throw new Error(responseJson.message);
  }
}
