import { API_URL, COOKIES_KEYS } from '@constants';
import { GetRequestParameters, PostRequestParameters } from '@types';
import { cookies } from 'next/headers';

function getDefaultHeaders(): Headers {
  const headers: Headers = new Headers();
  const accessToken: string = cookies().get(COOKIES_KEYS.ACCESS)?.value ?? '';
  const refreshToken: string = cookies().get(COOKIES_KEYS.REFRESH)?.value ?? '';

  if (accessToken) headers.append(COOKIES_KEYS.ACCESS, accessToken);
  if (refreshToken) headers.append(COOKIES_KEYS.REFRESH, refreshToken);

  headers.append('Content-Type', 'application/json');

  return headers;
}

export async function postRequest({ url, body }: PostRequestParameters): Promise<Response> {
  const headers: Headers = getDefaultHeaders();

  return await fetch(`${API_URL}${url}`, {
    method: 'POST',
    body: body,
    headers,
  });
}

export async function getRequest({ url }: GetRequestParameters): Promise<Response> {
  const headers: Headers = getDefaultHeaders();

  return await fetch(`${API_URL}${url}`, {
    method: 'GET',
    headers,
  });
}
