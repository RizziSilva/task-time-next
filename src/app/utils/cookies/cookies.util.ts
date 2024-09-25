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

export function getAccessAndRefreshTokens(response: Response) {
  const cookiesFromResponse = getCookiesFromResponse(response);
  const accessToken: string = cookiesFromResponse.find((cookie) => cookie[COOKIES_KEYS.ACCESS]);
  const refreshToken: string = cookiesFromResponse.find((cookie) => cookie[COOKIES_KEYS.REFRESH]);

  return { accessToken, refreshToken };
}

export async function handleRefreshTokens(response: Response) {
  const tokens = getAccessAndRefreshTokens(response);
  console.log('Novos tokens', tokens);
  if (tokens.accessToken && tokens.refreshToken)
    handleTokens(tokens.accessToken, tokens.refreshToken);
}

export function handleTokens(accessToken: string, refreshToken: string) {
  const cookieHandler = cookies();
  const accessExpirationDate: Date = new Date();
  accessExpirationDate.setSeconds(accessExpirationDate.getSeconds() + 5);
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
