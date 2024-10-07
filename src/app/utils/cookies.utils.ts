import { cookies } from 'next/headers';
import cookiesParse from 'cookie';
import { COOKIE_OPTIONS, COOKIES_KEYS, TOKEN_TYPE } from '@constants';
import { CookiesExpiration, Tokens } from '@types';

export function getRequestHeaders() {
  return { Cookie: cookies().toString() };
}

function getCookiesFromResponse(response: Response): Array<any> {
  const setCookies: string | null = response.headers.get('set-cookie');

  if (setCookies) {
    const responseCookies: Array<string> = setCookies.split(',');

    return responseCookies.map((responseCookie) => cookiesParse.parse(responseCookie));
  }

  return [];
}

export function getAccessAndRefreshTokens(response: Response): Tokens {
  const cookiesFromResponse: Array<any> = getCookiesFromResponse(response);
  const findedAccessToken = cookiesFromResponse.find((cookie) => cookie[COOKIES_KEYS.ACCESS]);
  const findedRefreshToken = cookiesFromResponse.find((cookie) => cookie[COOKIES_KEYS.REFRESH]);
  const accessToken: string = findedAccessToken ? findedAccessToken[COOKIES_KEYS.ACCESS] : '';
  const refreshToken: string = findedRefreshToken ? findedRefreshToken[COOKIES_KEYS.REFRESH] : '';

  return { accessToken, refreshToken };
}

export function getAccessAndRefreshExpire(): CookiesExpiration {
  const accessExpiration: Date = new Date();
  const refreshExpiration: Date = new Date();

  accessExpiration.setSeconds(accessExpiration.getSeconds() + 5);
  refreshExpiration.setHours(refreshExpiration.getHours() + 7);

  return { accessExpiration, refreshExpiration };
}

export function setAccessAndRefreshToken(tokens: Tokens) {
  const cookieStore = cookies();
  const cookiesExpiration = getAccessAndRefreshExpire();

  cookieStore.set(COOKIES_KEYS.ACCESS, `${TOKEN_TYPE}${tokens.accessToken}`, {
    expires: cookiesExpiration.accessExpiration,
    ...COOKIE_OPTIONS,
  });
  cookieStore.set(COOKIES_KEYS.REFRESH, `${TOKEN_TYPE}${tokens.refreshToken}`, {
    expires: cookiesExpiration.refreshExpiration,
    ...COOKIE_OPTIONS,
  });
}
