import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Sidebar } from '@/components';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Task Time',
  description: 'Project created for Task Time web site.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} flex h-screen w-screen bg-background-base text-base`}>
        {children}
      </body>
    </html>
  );
}
