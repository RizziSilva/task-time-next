import { getAuth } from '@utils';
import { API_URL } from '@constants';
import { GetRequestParameters, PostRequestParameters } from '@types';

async function addUserSession(headers: any, isServer: boolean = false) {
  const session = await getAuth(isServer);

  if (!session) return headers;

  return {
    ...headers,
    access_token: `Bearer ${session.token.access_token}`,
    refresh_token: `Bearer ${session.token.refresh_token}`,
  };
}

export async function postRequest({
  url,
  body,
  isServerSide,
}: PostRequestParameters): Promise<Response> {
  return await fetch(`${API_URL}${url}`, {
    method: 'POST',
    body: body,
    headers: await addUserSession(
      {
        'Content-Type': 'application/json',
      },
      isServerSide,
    ),
  });
}

export async function getRequest({ url, isServerSide }: GetRequestParameters): Promise<Response> {
  return await fetch(`${API_URL}${url}`, {
    method: 'GET',
    headers: await addUserSession(
      {
        'Content-Type': 'application/json',
      },
      isServerSide,
    ),
  });
}
