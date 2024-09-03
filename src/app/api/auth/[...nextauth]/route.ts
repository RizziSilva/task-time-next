import NextAuth, { NextAuthOptions, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { ROUTES } from '@constants';

export const OPTIONS: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: ROUTES.LOGIN,
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && account.type === 'credentials') token.user = user.user;

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
      async authorize(credentials): Promise<User> {
        const credentialsUser = credentials as { user: string };
        const user = JSON.parse(credentialsUser.user);

        return { user };
      },
    }),
  ],
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
