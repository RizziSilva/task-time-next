import { cookies } from 'next/headers';
import { COOKIES_KEYS } from '@constants';
import cookiesParse from 'cookie';

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

export function getAccessAndRefreshTokens(response: Response) {
  const cookiesFromResponse: Array<any> = getCookiesFromResponse(response);
  const accessToken: string = cookiesFromResponse.find((cookie) => cookie[COOKIES_KEYS.ACCESS]);
  const refreshToken: string = cookiesFromResponse.find((cookie) => cookie[COOKIES_KEYS.REFRESH]);

  return { accessToken, refreshToken };
}

export function getAccessAndRefreshExpire() {
  const accessExpirationDate: Date = new Date();
  const refreshExpirationDate: Date = new Date();

  accessExpirationDate.setSeconds(accessExpirationDate.getSeconds() + 5);
  refreshExpirationDate.setHours(refreshExpirationDate.getHours() + 7);

  return { accessExpirationDate, refreshExpirationDate };
}
