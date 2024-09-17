import { COOKIE_OPTIONS, COOKIES_KEYS, TOKEN_TYPE } from '@/constants';
import { cookies } from 'next/headers';

export function handleResponseTokens(response: Response) {
  const setCookieHeader = response.headers.get('Set-Cookie');

  if (setCookieHeader) {
    const accessToken = setCookieHeader.split(';')[0].split('=')[1];
    const refreshToken = setCookieHeader.split(';')[1].split('=')[1];

    handleTokens(accessToken, refreshToken);
  }
}

export function handleTokens(accessToken: string, refreshToken: string) {
  const cookieHandler = cookies();

  cookieHandler.set(COOKIES_KEYS.ACCESS, `${TOKEN_TYPE}${accessToken}`, COOKIE_OPTIONS);
  cookieHandler.set(COOKIES_KEYS.REFRESH, `${TOKEN_TYPE}${refreshToken}`, COOKIE_OPTIONS);
}
