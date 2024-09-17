import { API_DOMAIN, API_URL } from './envs.constant';

export const COOKIES_KEYS = {
  ACCESS: 'access_token',
  REFRESH: 'refresh_token',
};

export const TOKEN_TYPE = 'Bearer ';

export const COOKIE_OPTIONS = {
  domain: API_DOMAIN,
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: true,
};
