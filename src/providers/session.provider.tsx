'use client';

import { SessionProvider } from 'next-auth/react';

export function CustomSession({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
