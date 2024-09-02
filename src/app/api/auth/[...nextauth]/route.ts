import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { ROUTES } from '@/constants';
import { LoginResponseType } from '@/types/login';

export const OPTIONS: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: ROUTES.LOGIN,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      console.log(user);
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
        console.log('credentials', credentials);
        const { user } = credentials;

        return user;
      },
    }),
  ],
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
