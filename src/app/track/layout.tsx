import { Sidebar } from '@/components';

export default async function TrackLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className='flex h-full w-full bg-background-base text-base small-screen:flex-col'>
      <Sidebar />
      <div className='ml-sidebar-width'>{children}</div>
    </section>
  );
}
