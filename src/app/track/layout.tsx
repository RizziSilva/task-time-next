import { Sidebar } from '@/components';

export default function TrackLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className='small-screen:flex-col flex h-full w-full bg-background-base text-base'>
      <Sidebar />
      <div className='ml-sidebar-width'>{children}</div>
    </section>
  );
}
