import { redirect } from 'next/navigation';
import { API_URL, ROUTES } from '@constants';
import { GetRequestParameters, PostRequestParameters } from '@types';

async function requestInterceptor(url: string, options: RequestInit): Promise<Response> {
  const response: Response = await fetch(`${API_URL}${url}`, options);
  const status: number = response.status;

  if (status === 401) redirect(ROUTES.LOGIN);

  return response;
}

export async function postRequest({ url, body }: PostRequestParameters): Promise<Response> {
  const { cookies } = await import('next/headers');

  return await requestInterceptor(url, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies().toString(),
    },
  });
}

export async function getRequest({ url }: GetRequestParameters): Promise<Response> {
  const { cookies } = await import('next/headers');

  return await requestInterceptor(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies().toString(),
    },
    credentials: 'include',
  });
}
