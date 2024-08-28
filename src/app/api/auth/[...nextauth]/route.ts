import { ROUTES } from '@/constants';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
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
        const email = credentials?.email;
        const password = credentials?.password;

        return { userName: 'Emerson Dias', email: 'emerson.fraga@gmail.com', id: 1 };
      },
    }),
  ],
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
