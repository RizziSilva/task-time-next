import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { SessionProvider } from '@providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task Time',
  description: 'Project created for Task Time web site.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang='en'>
      <body className={`${inter.className} flex h-screen w-screen bg-background-base text-base`}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
