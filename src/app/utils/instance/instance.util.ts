import { API_URL, ROUTES } from '@constants';
import { GetRequestParameters, PostRequestParameters } from '@types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { handleRefreshTokens } from '../cookies/cookies.util';

function getHeaders() {
  return { Cookie: cookies().toString() };
}

async function fetchInterceptor(url, options) {
  const response = await fetch(`${API_URL}${url}`, options);
  const status: number = response.status;
  const isUnauthorized: boolean = status === 401;

  if (isUnauthorized) redirect(ROUTES.LOGIN);

  handleRefreshTokens(response);

  return response;
}

export async function postRequest({ url, body }: PostRequestParameters): Promise<Response> {
  return await fetchInterceptor(url, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json',
      ...getHeaders(),
    },
    credentials: 'include',
  });
}

export async function getRequest({ url }: GetRequestParameters): Promise<Response> {
  return fetchInterceptor(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getHeaders(),
    },
    credentials: 'include',
  });
}
