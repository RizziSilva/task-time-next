import { PostRequestParameters, LoginRequestType } from '@types';
import { postRequest } from '../request/instance.service';

export class AuthService {
  async login(requestBody: LoginRequestType) {
    const body: BodyInit = JSON.stringify(requestBody);
    const requestOptions: PostRequestParameters = { url: '/auth/login', body };
    const response = await postRequest(requestOptions);
    const responseJson = await response.json();

    if (response.ok) return responseJson;
    else throw new Error(responseJson.message);
  }
}
