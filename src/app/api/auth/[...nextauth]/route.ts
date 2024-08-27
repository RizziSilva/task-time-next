import { ROUTES } from '@/constants';
import { AuthService } from '@/services';
import { Tokens } from '@/types';
import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    Credentials({
      credentials: {
        password: { label: 'Password', type: 'password' },
        email: { label: 'Email', type: 'text' },
      },
      async authorize(credentials, req) {
        try {
          const password = credentials?.password;
          const email = credentials?.email;
          const authService: AuthService = new AuthService();
          const response = await authService.login({ email, password });
          const tokens: Tokens = {
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
          };

          return tokens;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: ROUTES.LOGIN,
  },
});

export { handler as GET, handler as POST };
