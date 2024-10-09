'use server';

import { redirect } from 'next/navigation';
import { getRequestHeaders } from '@app-utils';
import { API_URL, ROUTES } from '@constants';
import { GetRequestParameters, PostRequestParameters } from '@types';

async function fetchInterceptor(url: string, options: RequestInit) {
  const response = await fetch(url, options);
  const status: number = response.status;
  const isUnauthorized: boolean = status === 401;

  if (isUnauthorized) redirect(ROUTES.LOGIN);

  return response;
}

export async function postRequest({ url, body }: PostRequestParameters): Promise<Response> {
  return await fetchInterceptor(`${API_URL}${url}`, {
    method: 'POST',
    body: body,
    headers: {
      'Content-Type': 'application/json',
      ...getRequestHeaders(),
    },
    credentials: 'include',
  });
}

export async function getRequest({ url }: GetRequestParameters): Promise<Response> {
  return await fetchInterceptor(`${API_URL}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...getRequestHeaders(),
    },
    credentials: 'include',
  });
}
