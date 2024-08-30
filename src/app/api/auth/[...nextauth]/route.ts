import { ROUTES } from '@/constants';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const OPTIONS: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: ROUTES.LOGIN,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && account.type === 'credentials') token.user = user;

      return token;
    },
    async session({ session, token, user }) {
      session.user = token.user;

      return session;
    },
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { accessToken, refreshToken } = credentials as {
          accessToken: string;
          refreshToken: string;
        };

        return { accessToken, refreshToken };
      },
    }),
  ],
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
