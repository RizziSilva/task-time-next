import { NextRequest, NextResponse } from 'next/server';
import { getAccessAndRefreshExpire, getAccessAndRefreshTokens } from '@app-utils';
import { COOKIE_OPTIONS, COOKIES_KEYS, ROUTES, TOKEN_TYPE } from './constants';
import { refresh } from './services';
import { CookiesExpiration, Tokens } from './types';

function handleLoggedUser(isLoginPage: boolean, request: NextRequest) {
  if (isLoginPage) return NextResponse.redirect(new URL(ROUTES.TIMER, request.url));

  return NextResponse.next();
}

function handleLoggedOutUser(isLoginPage: boolean, request: NextRequest) {
  if (!isLoginPage) return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));

  return NextResponse.next();
}

async function handleRefreshToken(request: NextRequest) {
  try {
    const response: Response = await refresh();
    const tokens: Tokens = getAccessAndRefreshTokens(response);
    const nextResponse = NextResponse.redirect(request.nextUrl);
    const cookiesExpiration: CookiesExpiration = getAccessAndRefreshExpire();

    nextResponse.cookies.set(COOKIES_KEYS.REFRESH, `${TOKEN_TYPE}${tokens.refreshToken}`, {
      expires: cookiesExpiration.refreshExpiration,
      ...COOKIE_OPTIONS,
    });
    nextResponse.cookies.set(COOKIES_KEYS.ACCESS, `${TOKEN_TYPE}${tokens.accessToken}`, {
      expires: cookiesExpiration.accessExpiration,
      ...COOKIE_OPTIONS,
    });

    return nextResponse;
  } catch (error) {
    const response = NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));

    response.cookies.delete(COOKIES_KEYS.REFRESH);

    return response;
  }
}

export async function middleware(request: NextRequest) {
  const accessToken: string | undefined = request.cookies.get(COOKIES_KEYS.ACCESS)?.value;
  const refreshToken: string | undefined = request.cookies.get(COOKIES_KEYS.REFRESH)?.value;
  const isLoginPage: boolean = request.nextUrl.pathname === ROUTES.LOGIN;

  if (!!accessToken) return handleLoggedUser(isLoginPage, request);

  if (!refreshToken) return handleLoggedOutUser(isLoginPage, request);

  return await handleRefreshToken(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
