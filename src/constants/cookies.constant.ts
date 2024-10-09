import { API_DOMAIN } from './envs.constant';

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

export const COOKIES_EXPIRATION_TIME = {
  [COOKIES_KEYS.ACCESS]: 5,
  [COOKIES_KEYS.REFRESH]: 7,
};
