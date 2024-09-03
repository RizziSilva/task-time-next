import { API_URL } from '@constants';
import { PostRequestParameters, Tokens } from '@types';
import { useSession } from 'next-auth/react';

function addUserSession(headers: any) {
  const { data, status } = useSession();

  if (status !== 'authenticated') return headers;

  const tokens: Tokens = data?.user.tokens;

  return { ...headers, access_token: tokens.accessToken, refresh_token: tokens.refreshToken };
}

export async function postRequest({ url, body }: PostRequestParameters): Promise<Response> {
  return await fetch(`${API_URL}${url}`, {
    method: 'POST',
    body: body,
    headers: addUserSession({
      'Content-Type': 'application/json',
    }),
  });
}
