import { Sidebar } from '@/components';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/route';

export default async function TrackLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log(await getServerSession(options));
  return (
    <section className='flex h-full w-full bg-background-base text-base small-screen:flex-col'>
      <Sidebar />
      <div className='ml-sidebar-width'>{children}</div>
    </section>
  );
}
