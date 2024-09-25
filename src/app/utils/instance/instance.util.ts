import { API_URL, ROUTES } from '@constants';
import { GetRequestParameters, PostRequestParameters } from '@types';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

function getHeaders() {
  console.log('cookies().toString()', cookies().toString());

  return { Cookie: cookies().toString() };
}

async function fetchInterceptor(url, options) {
  const response = await fetch(`${API_URL}${url}`, options);
  const status: number = response.status;
  const isUnauthorized: boolean = status === 401;
  console.log('options', options);
  if (isUnauthorized) redirect(ROUTES.LOGIN);

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
      ...headers(),
    },
    credentials: 'include',
  });
}
