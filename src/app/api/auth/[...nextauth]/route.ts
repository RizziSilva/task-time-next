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
    async jwt({ token, account, profile }) {
      if (account && account.type === 'credentials') {
        token.userId = account.providerAccountId;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.userId;

      return session;
    },
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        console.log('credentials', credentials.test);

        return { test: credentials.test };
      },
    }),
  ],
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
