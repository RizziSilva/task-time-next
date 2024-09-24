import { cookies } from 'next/headers';
import cookiesParse from 'cookie';
import { APP_DOMAIN, COOKIE_OPTIONS, COOKIES_KEYS, TOKEN_TYPE } from '@/constants';

function getCookiesFromResponse(response: Response): Array<any> {
  const setCookies: string | null = response.headers.get('set-cookie');

  if (setCookies) {
    const responseCookies = setCookies.split(',');

    return responseCookies.map((responseCookie) => cookiesParse.parse(responseCookie));
  }

  return [];
}

function getAccessAndRefreshTokens(cookies: Array<any>) {
  const accessToken: string = cookies.find((cookie) => cookie[COOKIES_KEYS.ACCESS]);
  const refreshToken: string = cookies.find((cookie) => cookie[COOKIES_KEYS.REFRESH]);

  return { accessToken, refreshToken };
}

export async function handleRefreshTokens(response: Response) {
  const cookies = getCookiesFromResponse(response);
  const tokens = getAccessAndRefreshTokens(cookies);

  if (tokens.accessToken && tokens.refreshToken) {
    await fetch(`${APP_DOMAIN}/api/auth/refresh`, {
      method: 'POST',
      body: JSON.stringify({
        tokens,
        setCookie: response.headers.get('set-cookie'),
      }),
    });
  }
}

export function handleTokens(accessToken: string, refreshToken: string) {
  const cookieHandler = cookies();
  const accessExpirationDate: Date = new Date();
  accessExpirationDate.setSeconds(accessExpirationDate.getSeconds() + 15);
  const refreshExpirationDate: Date = new Date();
  refreshExpirationDate.setHours(refreshExpirationDate.getHours() + 7);

  cookieHandler.set(COOKIES_KEYS.ACCESS, `${TOKEN_TYPE}${accessToken}`, {
    expires: accessExpirationDate,
    ...COOKIE_OPTIONS,
  });
  cookieHandler.set(COOKIES_KEYS.REFRESH, `${TOKEN_TYPE}${refreshToken}`, {
    expires: refreshExpirationDate,
    ...COOKIE_OPTIONS,
  });
}
