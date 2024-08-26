import { API_URL } from '@constants';
import { GetRequestParameters, PostRequestParameters } from '@types';

export async function postRequest({ url, body }: PostRequestParameters): Promise<Response> {
  return await fetch(`${API_URL}${url}`, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function getRequest({ url }: GetRequestParameters): Promise<Response> {
  return await fetch(`${API_URL}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
