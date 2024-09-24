import { handleTokens } from '@/app/utils/cookies/cookies.util';
import { COOKIES_KEYS } from '@/constants';

export async function POST(request: Request) {
  const response = await request.json();
  const tokens = response.tokens;
  const accessToken: string = tokens.accessToken[COOKIES_KEYS.ACCESS];
  const refreshToken: string = tokens.refreshToken[COOKIES_KEYS.REFRESH];
  const setCookie: string = response.setCookie;

  handleTokens(accessToken, refreshToken);

  return new Response('', {
    status: 200,
    headers: { 'Set-Cookie': `${setCookie}` },
  });
}
