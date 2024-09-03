import NextAuth from 'next-auth';
import { SessionType } from './next-auth/session.types';

declare module 'next-auth/jwt' {
  interface JWT {
    user: SessionType;
  }
}

declare module 'next-auth' {
  interface Session {
    user: SessionType;
  }

  interface User {
    user: SessionType;
    id?: string;
  }
}
