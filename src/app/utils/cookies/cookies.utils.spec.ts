import { cookies } from 'next/headers';
import {
  getAccessAndRefreshExpire,
  getRequestHeaders,
  setAccessAndRefreshToken,
} from './cookies.utils';
import { COOKIES_EXPIRATION_TIME, COOKIES_KEYS } from '@/constants';
import { CookiesExpiration, Tokens } from '@/types';

// TODO silva.william 07/10/2024: Realizar os testes das função getAccessAndRefreshTokens. Necessário descobrir como mockar o response do fetch.
jest.mock('next/headers', () => ({
  ...jest.requireActual('next/headers'),
  cookies: jest.fn(() => ({
    toString: jest.fn(),
    set: jest.fn(),
  })),
}));

describe('Cookies Tests', () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('getRequestHeaders tests', () => {
    it('Return cookies string', () => {
      getRequestHeaders();

      expect(cookies).toHaveBeenCalled();
    });
  });

  describe('getAccessAndRefreshExpire tests', () => {
    it('Return expiration time', () => {
      const accessDate: Date = new Date();
      const refreshDate: Date = new Date();

      accessDate.setSeconds(accessDate.getSeconds() + COOKIES_EXPIRATION_TIME[COOKIES_KEYS.ACCESS]);
      refreshDate.setHours(refreshDate.getHours() + COOKIES_EXPIRATION_TIME[COOKIES_KEYS.REFRESH]);

      const expected: CookiesExpiration = {
        accessExpiration: accessDate,
        refreshExpiration: refreshDate,
      };
      const result: CookiesExpiration = getAccessAndRefreshExpire();

      expect(result.accessExpiration).toStrictEqual(expected.accessExpiration);
      expect(result.refreshExpiration).toStrictEqual(expected.refreshExpiration);
    });
  });

  describe('setAccessAndRefreshToken tests', () => {
    const tokens: Tokens = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };

    setAccessAndRefreshToken(tokens);

    expect(cookies).toHaveBeenCalled();
  });
});
