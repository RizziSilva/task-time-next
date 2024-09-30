import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIE_OPTIONS, COOKIES_KEYS, ROUTES, TOKEN_TYPE } from './constants';
import { refresh } from './services';
import { getAccessAndRefreshTokens } from './app/utils/cookies/cookies.util';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIES_KEYS.ACCESS);
  const refreshToken = request.cookies.get(COOKIES_KEYS.REFRESH);

  if (accessToken) return NextResponse.next();
  if (!refreshToken) return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  console.log('Vai chamar o endpoint de refresh', refreshToken);
  const response: Response = await refresh();

  const tokens = getAccessAndRefreshTokens(response);
  console.log('Vai chamar o endpoint de refresh', tokens);
  const nextResponse = NextResponse.redirect(request.nextUrl);
  const accessExpirationDate: Date = new Date();
  accessExpirationDate.setSeconds(accessExpirationDate.getSeconds() + 5);
  const refreshExpirationDate: Date = new Date();
  refreshExpirationDate.setHours(refreshExpirationDate.getHours() + 7);

  nextResponse.cookies.set(
    COOKIES_KEYS.REFRESH,
    `${TOKEN_TYPE}${tokens.refreshToken[COOKIES_KEYS.REFRESH]}`,
    { expires: refreshExpirationDate, ...COOKIE_OPTIONS },
  );
  nextResponse.cookies.set(
    COOKIES_KEYS.ACCESS,
    `${TOKEN_TYPE}${tokens.accessToken[COOKIES_KEYS.ACCESS]}`,
    { expires: accessExpirationDate, ...COOKIE_OPTIONS },
  );

  return nextResponse;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|auth/).*)'],
};
