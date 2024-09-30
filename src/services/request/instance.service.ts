import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { API_URL, ROUTES } from '@constants';
import { PostRequestParameters } from '@types';

function getRequestHeaders() {
  console.log('cookies().toString()', cookies().toString());

  return { Cookie: cookies().toString() };
}

async function fetchInterceptor(url: string, options: RequestInit) {
  console.log('options', options);
  const response = await fetch(`${API_URL}${url}`, options);
  const status: number = response.status;
  const isUnauthorized: boolean = status === 401;

  if (isUnauthorized) redirect(ROUTES.LOGIN);

  return response;
}

export async function postRequest({ url, body }: PostRequestParameters): Promise<Response> {
  return await fetch(`${API_URL}${url}`, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json',
      ...getRequestHeaders(),
    },
    credentials: 'include',
  });
}
