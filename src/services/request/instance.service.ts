import { API_URL } from '@constants';
import { PostRequestParameters } from '@types';

export async function postRequest({ url, body }: PostRequestParameters) {
  return await fetch(`${API_URL}${url}`, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
