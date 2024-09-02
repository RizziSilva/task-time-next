import { getServerSession } from 'next-auth';
import { Sidebar } from '@components';
import { CustomSession } from '@providers';

export default async function TrackLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <section className='flex h-full w-full bg-background-base text-base small-screen:flex-col'>
      <CustomSession session={session}>
        <Sidebar />
      </CustomSession>
      <div className='ml-sidebar-width'>{children}</div>
    </section>
  );
}
