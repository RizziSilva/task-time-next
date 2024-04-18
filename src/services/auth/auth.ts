import { postRequest } from '../request/instance';

export async function login() {
  const response = await postRequest('/auth/login');
}
