import { API_URL } from '@constants';
import { PostRequestParameters, Tokens } from '@types';
import { getServerSession } from 'next-auth';

async function addUserSession(headers: any) {
  const session = await getServerSession();
  console.log('session', session);

  return headers;

  // if (status !== 'authenticated') return headers;

  // const tokens: Tokens = data?.user.tokens;

  // return { ...headers, access_token: tokens.accessToken, refresh_token: tokens.refreshToken };
}

export async function postRequest({ url, body }: PostRequestParameters): Promise<Response> {
  return await fetch(`${API_URL}${url}`, {
    method: 'POST',
    body: body,
    headers: await addUserSession({
      'Content-Type': 'application/json',
    }),
  });
}
