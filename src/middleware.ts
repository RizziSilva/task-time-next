import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_OPTIONS, COOKIES_KEYS, ROUTES, TOKEN_TYPE } from './constants';
import { AuthService } from './services';
import { getAccessAndRefreshExpire, getAccessAndRefreshTokens } from './utils';

export async function middleware(request: NextRequest) {
  const accessToken: string | undefined = request.cookies.get(COOKIES_KEYS.ACCESS)?.value;
  const refreshToken: string | undefined = request.cookies.get(COOKIES_KEYS.REFRESH)?.value;
  const isLoginPage: boolean = request.nextUrl.pathname === ROUTES.LOGIN;

  if (!!accessToken) {
    if (isLoginPage) return NextResponse.redirect(new URL(ROUTES.TIMER, request.url));

    return NextResponse.next();
  }

  if (!refreshToken) {
    if (!isLoginPage) return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));

    return NextResponse.next();
  }

  const authService: AuthService = new AuthService();
  const response: Response = await authService.refresh();
  const tokens = getAccessAndRefreshTokens(response);
  console.log('Refreshed tokens', tokens);
  const nextResponse = NextResponse.redirect(request.nextUrl);
  const cookiesExpiration = getAccessAndRefreshExpire();

  nextResponse.cookies.set(
    COOKIES_KEYS.REFRESH,
    `${TOKEN_TYPE}${tokens.refreshToken[COOKIES_KEYS.REFRESH]}`,
    { expires: cookiesExpiration.refreshExpirationDate, ...COOKIE_OPTIONS },
  );
  nextResponse.cookies.set(
    COOKIES_KEYS.ACCESS,
    `${TOKEN_TYPE}${tokens.accessToken[COOKIES_KEYS.ACCESS]}`,
    { expires: cookiesExpiration.accessExpirationDate, ...COOKIE_OPTIONS },
  );

  return nextResponse;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
